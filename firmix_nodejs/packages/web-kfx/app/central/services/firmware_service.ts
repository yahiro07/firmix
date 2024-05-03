import { encodeBinaryBase64 } from "@mx/auxiliaries/base_env_adapters/base64";
import { ConfigurationEditItem } from "@mx/web-kfx/app/base/types_project_edit";
import { firmixPresenter_firmwarePatching } from "@mx/web-kfx/app/cardinal/firmix_presenter_firmware_patching/mod";
import { storehouse } from "@mx/web-kfx/app/central/depot/storehouse";
import { projectHelper } from "@mx/web-kfx/app/central/domain_helpers/project_helper";

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
