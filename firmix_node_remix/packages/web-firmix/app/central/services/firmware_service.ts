import { encodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { ConfigurationEditItem } from "web-firmix/app/base/types_project_edit.ts";
import { firmixPresenter_firmwarePatching } from "web-firmix/app/cardinal/firmix_presenter_firmware_patching/mod.ts";
import { storehouse } from "web-firmix/app/central/depot/storehouse.ts";
import { projectHelper } from "web-firmix/app/central/domain_helpers/project_helper.ts";

export function createFirmwareService() {
  return {
    async generatePatchedFirmware(
      projectId: string,
      editItems: ConfigurationEditItem[]
    ): Promise<{ fileName: string; fileContentBytes_base64: string }> {
      const project = await storehouse.projectCabinet.get(projectId);
      const firmwareBinaryUrl = projectHelper.getFirmwareBinaryUrl(project);
      const res =
        await firmixPresenter_firmwarePatching.generatePatchedFirmware(
          {
            projectId,
            targetMcu: project.targetMcu,
            dataEntries: project.dataEntries,
            editUiItems: project.editUiItems,
            firmwareBinaryUrl,
            pinNumbersMap: project.pinNumbersMap,
          },
          editItems
        );
      return {
        fileName: res.fileName,
        fileContentBytes_base64: encodeBinaryBase64(res.fileContentBytes),
      };
    },
  };
}
