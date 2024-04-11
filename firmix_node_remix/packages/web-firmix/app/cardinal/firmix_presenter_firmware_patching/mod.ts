import {
  ConfigurationEditItem,
  PatchingManifest,
} from "@m/web-firmix/base/types_project_edit.ts";
import { firmwareDataInjector } from "@m/web-firmix/cardinal/firmix_core_firmware_patching/firmware_data_injector.ts";
import { filePathHelper } from "auxiliaries/utils/file_path_helper.ts";
import { serverFetchHelper } from "auxiliaries/utils_be/server_fetch_helper.ts";

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
