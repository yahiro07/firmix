import { raiseError } from "~/aux/utils/error_util.ts";
import {
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";
import { firmwareDataInjector } from "~/cardinal/firmix_core_firmware_patching/firmware_data_injector.ts";

type FirmixCore_FirmwarePatching = {
  validateMetadataInput(metadataInput: ProjectMetadataInput): string;
  checkPatchingManifestValidity(manifest: PatchingManifest): string;
  checkPatchingDataBlobValidity(
    manifest: PatchingManifest,
    blob: PatchingDataBlob
  ): string;
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob
  ): FirmwareContainer;
};

export const firmixCore_firmwarePatching: FirmixCore_FirmwarePatching = {
  validateMetadataInput(metadataInput) {
    if (!metadataInput.tags) {
      return `missing field: tags`;
    }
    return "";
  },
  checkPatchingManifestValidity(_manifest) {
    return "";
  },
  checkPatchingDataBlobValidity(_manifest, _blob) {
    return "";
  },
  fabricateFirmware(firmware, patchingManifest, patchingDataBlob) {
    if (firmware.kind !== "uf2") {
      raiseError(`unsupported firmware type ${firmware.kind}`);
    }
    const modFirmwareBytes = firmwareDataInjector.patchFirmwareBinary(
      firmware.binaryBytes,
      patchingManifest,
      patchingDataBlob.editItems
    );
    const firmwareName = firmware.fileName.split(".")[0];
    const outputFileName = `${firmwareName}_patched.uf2`;
    return {
      kind: "uf2",
      fileName: outputFileName,
      binaryBytes: modFirmwareBytes,
    };
  },
};
