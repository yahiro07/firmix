import { encodeBinaryBase64 } from "@mx/auxiliaries/base_env_adapters/base64";
import { firmixPresenter_firmwarePatching } from "../../cardinal/firmix_presenter_firmware_patching/mod";
import { storehouse } from "../depot/storehouse";
import { projectHelper } from "../domain_helpers/project_helper";

export function createFirmwareService() {
  return {
    async generatePatchedFirmware(
      projectId: string
    ): Promise<{ fileName: string; fileContentBytes_base64: string }> {
      const project = await storehouse.projectCabinet.get(projectId);
      const firmwareBinaryUrl = projectHelper.getFirmwareBinaryUrl(project);
      const res =
        await firmixPresenter_firmwarePatching.generatePatchedFirmware({
          projectId,
          firmwareBinaryUrl,
        });
      return {
        fileName: res.fileName,
        fileContentBytes_base64: encodeBinaryBase64(res.fileContentBytes),
      };
    },
  };
}
