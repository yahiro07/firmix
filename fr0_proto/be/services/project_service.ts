import { raiseError } from "~/aux/utils/error_util.ts";
import { imageHelper_getImageFormat } from "~/aux/utils/image_helper.ts";
import { decodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import { generateHashMd5 } from "~/aux/utils_be/hash_helper.ts";
import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { serverImageHelper } from "~/aux/utils_be/server_image_helper.ts";
import { FirmwareFormat } from "~/base/types_app_common.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";
import { ProjectDetailDto } from "~/base/types_dto.ts";
import {
  LocalProjectSubmissionPayload,
  ProjectSubmissionArgument,
} from "~/base/types_dto_internal.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";
import { objectStorageBridge } from "~/be/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/be/depot/storehouse.ts";
import { projectHelper } from "~/be/domain_helpers/project_helper.ts";
import { firmixCore_projectLoader } from "~/cardinal/firmix_core_project_loader/mod.ts";

export function createProjectService() {
  const m = {
    async upsertProject(args: {
      userId: string;
      readmeFileContent: string;
      metadataFileContent: string;
      thumbnailFileBytes: Uint8Array;
      firmwareFormat: FirmwareFormat;
      firmwareFileBytes: Uint8Array;
    }) {
      const {
        userId,
        readmeFileContent,
        metadataFileContent,
        thumbnailFileBytes,
        firmwareFormat,
        firmwareFileBytes,
      } = args;
      const metadataInput =
        firmixCore_projectLoader.loadProjectMetadataFile_json(
          metadataFileContent
        );
      const existingProject = await storehouse.projectCollection.findOne({
        projectGuid: metadataInput.projectGuid,
      });
      const projectId =
        existingProject?.projectId ?? generateIdTimeSequential();

      const thumbnailFormat = imageHelper_getImageFormat(thumbnailFileBytes);
      if (!thumbnailFormat) {
        raiseError(`invalid or unsupported thumbnail image file format`);
      }
      const imageSize = await serverImageHelper.getImageSize(
        thumbnailFileBytes
      );
      const imageSizeValid = imageSize.w <= 320 && imageSize.h <= 240;
      if (!imageSizeValid) {
        raiseError(
          `thumbnail image size too large, actual:${imageSize.w}x${imageSize.h}, expected: 320x240`
        );
      }

      const firmwareFormatValid = ["uf2"].includes(firmwareFormat);
      if (!firmwareFormatValid) {
        raiseError(`unsupported firmware format ${firmwareFormat}`);
      }

      const firmwareFileName = `firmware.${firmwareFormat}`;
      const firmwareFileHash = generateHashMd5(firmwareFileBytes);
      let firmwareRevision = existingProject?.firmwareRevision ?? 1;

      const thumbnailFileName = `thumbnail.${thumbnailFormat.fileExtension}`;
      const thumbnailFileHash = generateHashMd5(thumbnailFileBytes);
      let thumbnailRevision = existingProject?.thumbnailRevision ?? 1;

      if (firmwareFileHash !== existingProject?.firmwareFileHash) {
        await objectStorageBridge.uploadBinaryFile(
          `${projectId}/${firmwareFileName}`,
          firmwareFileBytes
        );
        firmwareRevision++;
      }
      if (thumbnailFileHash !== existingProject?.thumbnailFileHash) {
        await objectStorageBridge.uploadImageFile(
          `${projectId}/${thumbnailFileName}`,
          thumbnailFileBytes,
          thumbnailFormat.mimeType
        );
        thumbnailRevision++;
      }

      const projectEntity = local.createProjectEntity({
        projectId,
        userId,
        metadataInput,
        readmeFileContent,
        firmwareFileName,
        firmwareFileHash,
        firmwareRevision,
        thumbnailFileName,
        thumbnailFileHash,
        thumbnailRevision,
      });
      await storehouse.projectCabinet.upsert(projectEntity);
    },
  };

  return {
    async upsertProject(args: ProjectSubmissionArgument) {
      const user = await storehouse.userCollection.findOne({
        apiKey: args.apiKey,
      });
      if (!user) raiseError(`invalid api key`);

      await m.upsertProject({ ...args, userId: user.userId });
    },
    async upsertProjectFromLocal(
      projectPayload: LocalProjectSubmissionPayload,
      userId: string
    ) {
      const {
        readmeFileContent,
        metadataFileContent,
        thumbnailFileBytes_base64,
        firmwareFormat,
        firmwareFileBytes_base64,
      } = projectPayload;

      await m.upsertProject({
        userId,
        readmeFileContent,
        metadataFileContent,
        thumbnailFileBytes: decodeBinaryBase64(thumbnailFileBytes_base64),
        firmwareFormat,
        firmwareFileBytes: decodeBinaryBase64(firmwareFileBytes_base64),
      });
    },
    async getProjectDetail(projectId: string): Promise<ProjectDetailDto> {
      const project = await storehouse.projectCabinet.get(projectId);
      return local.mapProjectEntityToDetailDto(project);
    },
    async deleteProject(projectId: string) {
      await storehouse.projectCabinet.delete(projectId);
      const paths = await objectStorageBridge.listItemPathsWithPrefix(
        `${projectId}/`
      );
      for (const path of paths) {
        await objectStorageBridge.deleteItem(path);
      }
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
    thumbnailFileName: string;
    thumbnailFileHash: string;
    thumbnailRevision: number;
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
      thumbnailFileName: args.thumbnailFileName,
      thumbnailFileHash: args.thumbnailFileHash,
      thumbnailRevision: args.thumbnailRevision,
    };
  },
  mapProjectEntityToDetailDto(project: ProjectEntity): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectGuid: project.projectGuid,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      tags: project.tags,
      repositoryUrl: project.repositoryUrl,
      readmeFileContent: project.readmeFileContent,
      dataEntries: project.dataEntries,
      editUiItems: project.editUiItems,
      thumbnailUrl: projectHelper.getThumbnailImageUrl(project),
      firmwareBinaryUrl: projectHelper.getFirmwareBinaryUrl(project),
    };
  },
};
