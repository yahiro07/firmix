import {
  decodeBinaryBase64,
  imageDataUrlHelper,
} from "~/aux/utils/utils_binary.ts";
import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";
import {
  LocalProjectSubmissionInputDto,
  ProjectDetailDto,
} from "~/base/types_dto.ts";
import { objectStorageBridge } from "~/be/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/be/depot/storehouse.ts";
import { projectHelper } from "~/be/domain_helpers/project_helper.ts";

export function createProjectService() {
  return {
    async createProjectFromLocal(projectInput: LocalProjectSubmissionInputDto) {
      const existingProject = await storehouse.colProject.findOne({
        projectGuid: projectInput.projectGuid,
      });
      const projectId =
        existingProject?.projectId ?? generateIdTimeSequential();
      const { thumbnailObject, firmwareObject } = projectInput;
      await objectStorageBridge.uploadBinaryFile(
        `${projectId}/${firmwareObject.fileName}`,
        decodeBinaryBase64(firmwareObject.binaryBytes_base64)
      );
      const {
        binaryBytes: thumbnail_binaryBytes,
        contentType: thumbnail_contentType,
      } = imageDataUrlHelper.extractImageDataUrl(thumbnailObject.imageDataUrl);
      await objectStorageBridge.uploadImageFile(
        `${projectId}/${thumbnailObject.fileName}`,
        thumbnail_binaryBytes,
        thumbnail_contentType
      );
      const projectEntity = local.createProjectEntity(projectId, projectInput);
      await storehouse.projectCabinet.upsert(projectEntity);
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
  createProjectEntity(
    projectId: string,
    projectInput: LocalProjectSubmissionInputDto
  ): ProjectEntity {
    return {
      projectId,
      projectGuid: projectInput.projectGuid,
      projectName: projectInput.projectName,
      introduction: projectInput.introduction,
      targetMcu: projectInput.targetMcu,
      primaryTargetBoard: projectInput.primaryTargetBoard,
      tags: projectInput.tags,
      repositoryUrl: projectInput.repositoryUrl,
      dataEntries: projectInput.dataEntries,
      editUiItems: projectInput.editUiItems,
      readmeFileContent: projectInput.readmeFileContent,
      firmwareFileName: projectInput.firmwareObject.fileName,
      thumbnailFileName: projectInput.thumbnailObject.fileName,
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
