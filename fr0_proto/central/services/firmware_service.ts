import { encodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixPresenter_firmwarePatching } from "~/cardinal/firmix_presenter_firmware_patching/mod.ts";
import { storehouse } from "~/central/depot/storehouse.ts";
import { projectHelper } from "~/central/domain_helpers/project_helper.ts";

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
