import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { storehouse } from "~/be/depot/storehouse.ts";
import { firmwareDataInjector } from "~/cardinal/firmix_core_firmware_patching/firmware_data_injector.ts";

export const firmixPresenter_firmwarePatching = {
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
};
