import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";

import { ProjectEntity } from "~/base/types_db_entity.ts";
import {
  LocalProjectSubmissionInputDto,
  ProjectDetailDto,
} from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmwareDataInjector } from "~/cathedral/firmix_core/firmware_data_injector.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { objectStorageBridge } from "~/server/depot/object_storage_bridge_instance.ts";
import { storehouse } from "~/server/depot/storehouse.ts";

export const serverShell = {
  async getProjectDetail(projectId: string): Promise<ProjectDetailDto> {
    const project = await storehouse.projectCabinet.get(projectId);
    return local.mapProjectEntityToDetailDto(project);
  },
  async generatePatchedFirmware(
    projectId: string,
    editItems: ConfigurationEditItem[]
  ): Promise<{ fileName: string; fileContentBytes: Uint8Array }> {
    const project = await storehouse.projectCabinet.get(projectId);
    const firmwareBinary = await serverFetchHelper.fetchBinary(
      "http://localhost:3000/gadget1/firmware.uf2",
      {}
    );
    const modFirmwareBinary = firmwareDataInjector.patchFirmwareBinary(
      firmwareBinary,
      project,
      editItems
    );
    return {
      fileName: "firmware.uf2",
      fileContentBytes: modFirmwareBinary,
    };
  },
  async createProjectFromLocal(projectInput: LocalProjectSubmissionInputDto) {
    const projectId = generateIdTimeSequential();
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
    await objectStorageBridge.uploadBinaryFile(
      `${projectId}/${firmwareObject.fileName}`,
      firmwareObject.binaryBytes
    );
    await objectStorageBridge.uploadImageFile(
      `${projectId}/${thumbnailObject.fileName}`,
      thumbnailObject.binaryBytes,
      thumbnailObject.mimeType
    );
    const projectEntity: ProjectEntity = {
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
    await storehouse.projectCabinet.insert(projectEntity);
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

const local = {
  mapProjectEntityToDetailDto(project: ProjectEntity): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      configurationSourceItemWrappers:
        firmixPresenter.buildConfigurationSourceItems(project),
    };
  },
};
