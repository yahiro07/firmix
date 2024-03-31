import { getDateTimeText_yyyyMMddHHmmss } from "~/auxiliaries/utils/date_time_helper.ts";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { decodeBinaryBase64 } from "~/auxiliaries/utils/utils_binary.ts";
import { executeInline } from "~/auxiliaries/utils/utils_general.ts";
import { generateHashMd5 } from "~/auxiliaries/utils_be/hash_helper.ts";
import { generateIdTimeSequential } from "~/auxiliaries/utils_be/id_generator.ts";
import { serverImageHelper } from "~/auxiliaries/utils_be/server_image_helper.ts";
import { InputFirmwareFormat } from "~/base/types_app_common.ts";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import {
  LocalProjectSubmissionPayload,
  ProjectSubmissionArgument,
} from "~/base/types_dto_internal.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";
import { firmixCore_projectLoader } from "~/cardinal/firmix_core_project_loader/mod.ts";
import { convertFirmwareBytesToUF2 } from "~/cardinal/firmix_presenter_common_modules/firmware_converter.ts";
import { objectStorageBridge } from "~/central/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/central/depot/storehouse.ts";

export function createProjectService() {
  const m = {
    async updateProjectLink(args: {
      projectId: string;
      parentProjectId: string;
      prevParentProjectId: string;
    }) {
      const { projectId, parentProjectId, prevParentProjectId } = args;
      if (parentProjectId !== prevParentProjectId) {
        if (prevParentProjectId) {
          await storehouse.projectCollection.updateOne(
            { projectId: prevParentProjectId },
            { $pull: { childProjectIds: projectId } }
          );
        }
        if (parentProjectId) {
          await storehouse.projectCollection.updateOne(
            { projectId: parentProjectId },
            { $addToSet: { childProjectIds: projectId } }
          );
        }
      }
    },
    // convertFirmwareToUF2(
    //   firmwareFileBytes: Uint8Array,
    //   firmwareFormat: InputFirmwareFormat,
    //   projectFileContent:
    // ): Uint8Array {
    //   if(firmwareFormat === "uf2"){
    //     return firmwareFileBytes;
    //   }else if(){

    //   }
    // },
    async upsertProject(args: {
      userId: string;
      readmeFileContent: string;
      projectFileContent: string;
      boardFileContent: string;
      firmwareFormat: InputFirmwareFormat;
      firmwareFileBytes: Uint8Array;
      thumbnailFileBytes: Uint8Array;
      automated: boolean;
    }) {
      const {
        userId,
        readmeFileContent,
        firmwareFormat: firmwareFormatInput,
        firmwareFileBytes: firmwareFileBytesInput,
        projectFileContent,
        boardFileContent,
        thumbnailFileBytes,
        automated,
      } = args;
      const { metadataInput, errorLines } =
        firmixCore_projectLoader.loadProjectMetadataFile_json(
          projectFileContent,
          boardFileContent
        );
      if (errorLines.length > 0) {
        raiseError(`invalid metadata schema, ${errorLines.join("\n")} `);
      }

      const { projectGuid, parentProjectGuid } = metadataInput;

      const existingProject = await storehouse.projectCollection.findOne({
        projectGuid,
      });
      const projectId =
        existingProject?.projectId ?? generateIdTimeSequential();

      const prevParentProjectId = existingProject?.parentProjectId ?? "";

      const parentProject =
        (parentProjectGuid &&
          (await storehouse.projectCollection.findOne({
            projectGuid: parentProjectGuid,
          }))) ||
        undefined;

      if (parentProject?.parentProjectId) {
        raiseError(`cannot create grandchild project`);
      }
      const parentProjectId = parentProject?.projectId ?? "";

      const childProjectIds = existingProject?.childProjectIds ?? [];

      const imageAttrs = await serverImageHelper.loadImageFileAssetAttrs(
        thumbnailFileBytes
      );
      firmixCore_projectLoader.validateOnlineThumbnailOnServer(imageAttrs);

      const firmwareFormatValid = ["uf2", "bin", "hex"].includes(
        firmwareFormatInput
      );
      if (!firmwareFormatValid) {
        raiseError(`unsupported firmware format ${firmwareFormatInput}`);
      }

      const firmwareFileBytes = executeInline(() => {
        if (firmwareFormatInput === "uf2") {
          return firmwareFileBytesInput;
        } else {
          const conversionResult = convertFirmwareBytesToUF2(
            firmwareFileBytesInput,
            metadataInput.firmwareSpec
          );
          return conversionResult.bytes;
        }
      });

      const firmwareFormat = "uf2";

      const revision = (existingProject?.revision ?? 0) + 1;
      const published = existingProject?.published ?? false;
      const createAt = existingProject?.createAt ?? Date.now();

      const firmwareFileName = `firmware.${firmwareFormat}`;
      const firmwareFileHash = generateHashMd5(firmwareFileBytes);
      let firmwareRevision = existingProject?.firmwareRevision ?? 0;
      let firmwareUpdateAt =
        existingProject?.firmwareUpdateAt ??
        existingProject?.updateAt ??
        Date.now();

      const thumbnailExtension = imageAttrs.mimeType.replace("image/", "");
      const thumbnailFileName = `thumbnail.${thumbnailExtension}`;
      const thumbnailFileHash = generateHashMd5(thumbnailFileBytes);
      let thumbnailRevision = existingProject?.thumbnailRevision ?? 0;

      if (firmwareFileHash !== existingProject?.firmwareFileHash) {
        await objectStorageBridge.uploadBinaryFile(
          `${projectId}/${firmwareFileName}`,
          firmwareFileBytes
        );
        firmwareRevision++;
        firmwareUpdateAt = Date.now();
      }

      if (thumbnailFileHash !== existingProject?.thumbnailFileHash) {
        await objectStorageBridge.uploadImageFile(
          `${projectId}/${thumbnailFileName}`,
          thumbnailFileBytes,
          imageAttrs.mimeType
        );
        thumbnailRevision++;
      }

      const projectEntity = local.createProjectEntity({
        projectId,
        userId,
        parentProjectId,
        childProjectIds,
        metadataInput,
        readmeFileContent,
        firmwareFileName,
        firmwareFileHash,
        firmwareRevision,
        firmwareUpdateAt,
        thumbnailFileName,
        thumbnailFileHash,
        thumbnailRevision,
        revision,
        published,
        automated,
        createAt,
      });
      await storehouse.projectCabinet.upsert(projectEntity);
      await m.updateProjectLink({
        projectId,
        parentProjectId,
        prevParentProjectId,
      });
      return projectEntity;
    },
    async upsertProjectWithLog(
      args: {
        userId: string;
        readmeFileContent: string;
        projectFileContent: string;
        boardFileContent: string;
        firmwareFormat: InputFirmwareFormat;
        firmwareFileBytes: Uint8Array;
        thumbnailFileBytes: Uint8Array;
        automated: boolean;
      },
      user: UserEntity
    ) {
      const from = args.automated ? "via api" : "from local";
      try {
        const project = await m.upsertProject(args);
        const timeText = getDateTimeText_yyyyMMddHHmmss(Date.now());
        console.log(
          `${timeText} user ${user.userName} published ${project.projectName} rev${project.revision} ${from}`
        );
      } catch (error) {
        const timeText = getDateTimeText_yyyyMMddHHmmss(Date.now());
        console.log(
          `${timeText} user ${user.userName} tried to publish a project ${from} but failed `
        );
        throw error;
      }
    },
  };

  return {
    async upsertProject(args: ProjectSubmissionArgument) {
      const {
        apiKey,
        readmeFileContent,
        projectFileContent,
        boardFileContent,
        firmwareFormat,
        firmwareFileBytes,
        thumbnailFileBytes,
      } = args;
      const user = await storehouse.userCollection.findOne({
        apiKey,
        apiKeyActive: true,
      });
      if (!user) raiseError(`invalid api key`);
      const { userId } = user;

      await m.upsertProjectWithLog(
        {
          userId,
          readmeFileContent,
          projectFileContent,
          boardFileContent,
          firmwareFormat,
          firmwareFileBytes,
          thumbnailFileBytes,
          automated: true,
        },
        user
      );
    },
    async setProjectPublicity(
      projectId: string,
      published: boolean,
      operatorUserId: string
    ) {
      await storehouse.userCabinet.get(operatorUserId);
      const project = await storehouse.projectCabinet.get(projectId);
      if (project.userId !== operatorUserId) raiseError(`invalid operation`);
      if (project.published === published)
        raiseError(`no state change occurred`);
      await storehouse.projectCabinet.patch(projectId, { published });
    },
    async upsertProjectFromLocal(
      projectPayload: LocalProjectSubmissionPayload,
      userId: string
    ) {
      const user = await storehouse.userCabinet.get(userId);

      const {
        readmeFileContent,
        projectFileContent,
        boardFileContent,
        firmwareFormat,
        firmwareFileBytes_base64,
        thumbnailFileBytes_base64,
      } = projectPayload;

      await m.upsertProjectWithLog(
        {
          userId,
          readmeFileContent,
          projectFileContent,
          boardFileContent,
          firmwareFormat,
          firmwareFileBytes: decodeBinaryBase64(firmwareFileBytes_base64),
          thumbnailFileBytes: decodeBinaryBase64(thumbnailFileBytes_base64),
          automated: false,
        },
        user
      );
    },
    async deleteProject(projectId: string, operatorUserId: string) {
      const project = await storehouse.projectCabinet.get(projectId);
      if (project.userId !== operatorUserId) raiseError(`invalid operation`);
      const paths = await objectStorageBridge.listItemPathsWithPrefix(
        `${projectId}/`
      );
      for (const path of paths) {
        await objectStorageBridge.deleteItem(path);
      }
      await storehouse.projectCabinet.delete(projectId);
    },
  };
}

const local = {
  createProjectEntity(args: {
    projectId: string;
    userId: string;
    parentProjectId: string;
    childProjectIds: string[];
    metadataInput: ProjectMetadataInput;
    readmeFileContent: string;
    firmwareFileName: string;
    firmwareFileHash: string;
    firmwareRevision: number;
    thumbnailFileName: string;
    thumbnailFileHash: string;
    thumbnailRevision: number;
    firmwareUpdateAt: number;
    revision: number;
    published: boolean;
    automated: boolean;
    createAt: number;
  }): ProjectEntity {
    const { metadataInput } = args;
    return {
      projectId: args.projectId,
      userId: args.userId,
      projectGuid: metadataInput.projectGuid,
      projectName: metadataInput.projectName,
      parentProjectId: args.parentProjectId,
      parentProjectGuid: metadataInput.parentProjectGuid,
      variationName: metadataInput.variationName,
      childProjectIds: args.childProjectIds,
      introduction: metadataInput.introduction,
      targetMcu: metadataInput.targetMcu,
      primaryTargetBoard: metadataInput.primaryTargetBoard,
      realm: metadataInput.realm,
      tags: metadataInput.tags,
      repositoryUrl: metadataInput.repositoryUrl,
      dataEntries: metadataInput.dataEntries,
      editUiItems: metadataInput.editUiItems,
      readmeFileContent: args.readmeFileContent,
      firmwareFileName: args.firmwareFileName,
      firmwareFileHash: args.firmwareFileHash,
      firmwareRevision: args.firmwareRevision,
      thumbnailFileName: args.thumbnailFileName,
      thumbnailFileHash: args.thumbnailFileHash,
      thumbnailRevision: args.thumbnailRevision,
      firmwareUpdateAt: args.firmwareUpdateAt,
      revision: args.revision,
      published: args.published,
      automated: args.automated,
      createAt: args.createAt,
      updateAt: Date.now(),
      pinNumbersMap: metadataInput.pinNumbersMap,
    };
  },
};
