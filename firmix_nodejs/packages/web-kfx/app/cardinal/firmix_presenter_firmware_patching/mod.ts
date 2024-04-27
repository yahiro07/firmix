import { filePathHelper } from "@mx/auxiliaries/utils/file_path_helper";
import { serverFetchHelper } from "@mx/auxiliaries/utils_be/server_fetch_helper";
import {
  ConfigurationEditItem,
  PatchingManifest,
} from "@mx/web-kfx/app/base/types_project_edit";
import { firmwareDataInjector } from "@mx/web-kfx/app/cardinal/firmix_core_firmware_patching/firmware_data_injector";

type ProjectPartial = PatchingManifest & {
  projectId: string;
  firmwareBinaryUrl: string;
};

export const firmixPresenter_firmwarePatching = {
  async generatePatchedFirmware(
    project: ProjectPartial,
    editItems: ConfigurationEditItem[]
  ): Promise<{ fileName: string; fileContentBytes: Uint8Array }> {
    const firmwareBinary = await serverFetchHelper.fetchBinary(
      project.firmwareBinaryUrl,
      {}
    );
    const modFirmwareBinary = firmwareDataInjector.patchFirmwareBinary(
      firmwareBinary,
      project,
      editItems
    );
    const fileName = filePathHelper.getFileNameFromFilePath(
      project.firmwareBinaryUrl
    );
    return {
      fileName,
      fileContentBytes: modFirmwareBinary,
    };
  },
};
