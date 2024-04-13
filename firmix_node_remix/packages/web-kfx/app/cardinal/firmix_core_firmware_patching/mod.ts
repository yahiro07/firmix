import {
  decodeBinaryBase64,
  encodeBinaryBase64,
} from "auxiliaries/base_env_adapters/base64";
import { raiseError } from "auxiliaries/utils/error_util";
import {
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
} from "web-kfx/app/base/types_project_edit";
import { firmwareDataInjector } from "web-kfx/app/cardinal/firmix_core_firmware_patching/firmware_data_injector";

type FirmixCore_FirmwarePatching = {
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob
  ): FirmwareContainer;
};

export const firmixCore_firmwarePatching: FirmixCore_FirmwarePatching = {
  fabricateFirmware(firmware, patchingManifest, patchingDataBlob) {
    if (firmware.kind !== "uf2") {
      raiseError(`unsupported firmware type ${firmware.kind}`);
    }
    const modFirmwareBytes = firmwareDataInjector.patchFirmwareBinary(
      decodeBinaryBase64(firmware.binaryBytes_base64),
      patchingManifest,
      patchingDataBlob.editItems
    );
    const firmwareName = firmware.fileName.split(".")[0];
    const outputFileName = `${firmwareName}_patched.uf2`;
    return {
      kind: "uf2",
      fileName: outputFileName,
      binaryBytes_base64: encodeBinaryBase64(modFirmwareBytes),
    };
  },
};
