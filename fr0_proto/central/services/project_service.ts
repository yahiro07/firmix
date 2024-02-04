import { getDateTimeText_yyyyMMddHHmmss } from "~/aux/utils/date_time_helper.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { decodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import { generateHashMd5 } from "~/aux/utils_be/hash_helper.ts";
import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { serverImageHelper } from "~/aux/utils_be/server_image_helper.ts";
import { specifyGithubAvatarUrlSize } from "~/base/avatar_size_modifier.ts";
import { FirmwareFormat } from "~/base/types_app_common.ts";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import { ProjectDetailDto } from "~/base/types_dto.ts";
import {
  LocalProjectSubmissionPayload,
  ProjectSubmissionArgument,
} from "~/base/types_dto_internal.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";
import { firmixCore_projectLoader } from "~/cardinal/firmix_core_project_loader/mod.ts";
import { objectStorageBridge } from "~/central/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/central/depot/storehouse.ts";
import { projectHelper } from "~/central/domain_helpers/project_helper.ts";

export function createProjectService() {
  const m = {
    async upsertProject(args: {
      userId: string;
      readmeFileContent: string;
      metadataFileContent: string;
      firmwareFormat: FirmwareFormat;
      firmwareFileBytes: Uint8Array;
      automated: boolean;
    }) {
      const {
        userId,
        readmeFileContent,
        metadataFileContent,
        firmwareFormat,
        firmwareFileBytes,
        automated,
      } = args;
      const { metadataInput, errorLines } =
        firmixCore_projectLoader.loadProjectMetadataFile_json(
          metadataFileContent
        );
      if (errorLines.length > 0) {
        raiseError(`invalid metadata schema, ${errorLines.join("\n")} `);
      }
      const existingProject = await storehouse.projectCollection.findOne({
        projectGuid: metadataInput.projectGuid,
      });
      const projectId =
        existingProject?.projectId ?? generateIdTimeSequential();

      const { thumbnailUrl } = metadataInput;

      const imageAttrs = await serverImageHelper.loadOnlineImageAssetAttrs(
        thumbnailUrl
      );
      firmixCore_projectLoader.validateOnlineThumbnailOnServer(imageAttrs);

      const firmwareFormatValid = ["uf2"].includes(firmwareFormat);
      if (!firmwareFormatValid) {
        raiseError(`unsupported firmware format ${firmwareFormat}`);
      }

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

      if (firmwareFileHash !== existingProject?.firmwareFileHash) {
        await objectStorageBridge.uploadBinaryFile(
          `${projectId}/${firmwareFileName}`,
          firmwareFileBytes
        );
        firmwareRevision++;
        firmwareUpdateAt = Date.now();
      }

      const projectEntity = local.createProjectEntity({
        projectId,
        userId,
        metadataInput,
        readmeFileContent,
        firmwareFileName,
        firmwareFileHash,
        firmwareRevision,
        firmwareUpdateAt,
        thumbnailUrl,
        revision,
        published,
        automated,
        createAt,
      });
      await storehouse.projectCabinet.upsert(projectEntity);
      return projectEntity;
    },
    async upsertProjectWithLog(
      args: {
        userId: string;
        readmeFileContent: string;
        metadataFileContent: string;
        firmwareFormat: FirmwareFormat;
        firmwareFileBytes: Uint8Array;
        automated: boolean;
      },
      user: UserEntity
    ) {
      const from = args.automated ? "via api" : "from local";
      try {
        const project = await m.upsertProject(args);
        const timeText = getDateTimeText_yyyyMMddHHmmss();
        console.log(
          `${timeText} user ${user.userName} published ${project.projectName} rev${project.revision} ${from}`
        );
      } catch (error) {
        const timeText = getDateTimeText_yyyyMMddHHmmss();
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
        metadataFileContent,
        firmwareFormat,
        firmwareFileBytes,
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
          metadataFileContent,
          firmwareFormat,
          firmwareFileBytes,
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
        metadataFileContent,
        firmwareFormat,
        firmwareFileBytes_base64,
      } = projectPayload;

      await m.upsertProjectWithLog(
        {
          userId,
          readmeFileContent,
          metadataFileContent,
          firmwareFormat,
          firmwareFileBytes: decodeBinaryBase64(firmwareFileBytes_base64),
          automated: false,
        },
        user
      );
    },
    async getProjectDetail(projectId: string): Promise<ProjectDetailDto> {
      const project = await storehouse.projectCabinet.get(projectId);
      const user = await storehouse.userCabinet.get(project.userId);
      return local.mapProjectEntityToDetailDto(project, user);
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
    metadataInput: ProjectMetadataInput;
    readmeFileContent: string;
    firmwareFileName: string;
    firmwareFileHash: string;
    firmwareRevision: number;
    firmwareUpdateAt: number;
    thumbnailUrl: string;
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
      introduction: metadataInput.introduction,
      targetMcu: metadataInput.targetMcu,
      primaryTargetBoard: metadataInput.primaryTargetBoard,
      tags: metadataInput.tags,
      repositoryUrl: metadataInput.repositoryUrl,
      dataEntries: metadataInput.dataEntries,
      editUiItems: metadataInput.editUiItems,
      readmeFileContent: args.readmeFileContent,
      firmwareFileName: args.firmwareFileName,
      firmwareFileHash: args.firmwareFileHash,
      firmwareRevision: args.firmwareRevision,
      firmwareUpdateAt: args.firmwareUpdateAt,
      thumbnailUrl: args.thumbnailUrl,
      revision: args.revision,
      published: args.published,
      automated: args.automated,
      createAt: args.createAt,
      updateAt: Date.now(),
    };
  },
  mapProjectEntityToDetailDto(
    project: ProjectEntity,
    user: UserEntity
  ): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectGuid: project.projectGuid,
      userId: project.userId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      tags: project.tags,
      repositoryUrl: project.repositoryUrl,
      readmeFileContent: project.readmeFileContent,
      dataEntries: project.dataEntries,
      editUiItems: project.editUiItems,
      thumbnailUrl: project.thumbnailUrl,
      firmwareBinaryUrl: projectHelper.getFirmwareBinaryUrl(project),
      firmwareUpdateAt: project.firmwareUpdateAt,
      published: project.published,
      automated: project.automated,
      firmwareRevision: project.firmwareRevision,
      updateAt: project.updateAt,
      userName: user.userName,
      userAvatarUrl: specifyGithubAvatarUrlSize(user.avatarUrl, 48),
    };
  },
};
