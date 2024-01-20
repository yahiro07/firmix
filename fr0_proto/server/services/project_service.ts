import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";
import {
  LocalProjectSubmissionInputDto,
  ProjectDetailDto,
} from "~/base/types_dto.ts";
import { firmixCore_firmwareConfiguration } from "~/cathedral/firmix_core_firmware_configuration/mod.ts";
import { objectStorageBridge } from "~/server/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/server/depot/storehouse.ts";

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
        firmwareObject.binaryBytes
      );
      await objectStorageBridge.uploadImageFile(
        `${projectId}/${thumbnailObject.fileName}`,
        thumbnailObject.binaryBytes,
        thumbnailObject.mimeType
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
    const {
      projectGuid,
      projectName,
      introduction,
      targetMcu,
      primaryTargetBoard,
      dataEntries,
      editUiItems,
      readmeFileContent,
      thumbnailObject,
      firmwareObject,
    } = projectInput;
    return {
      projectId,
      projectGuid,
      projectName,
      introduction,
      targetMcu,
      primaryTargetBoard,
      dataEntries,
      editUiItems,
      readmeFileContent,
      firmwareFileName: firmwareObject.fileName,
      thumbnailFileName: thumbnailObject.fileName,
    };
  },
  mapProjectEntityToDetailDto(project: ProjectEntity): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      configurationSourceItemWrappers:
        firmixCore_firmwareConfiguration.buildConfigurationSourceItems(project),
    };
  },
};
