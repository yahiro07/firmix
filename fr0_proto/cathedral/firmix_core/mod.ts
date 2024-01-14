import { raiseError } from "~/aux/utils/error_util.ts";
import { ProjectMetadataJsonFileContent } from "~/base/project_metadata_types.ts";
import { firmwareDataInjector } from "~/cathedral/firmix_core/firmware_data_injector.ts";
import {
  FirmixCore,
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
  ProjectMetadataInput,
} from "~/cathedral/firmix_core/types.ts";

export const firmixCore: FirmixCore = {
  loadProjectMetadataFile_json(
    fileContentText: string,
  ): ProjectMetadataInput {
    const metadata = JSON.parse(
      fileContentText,
    ) as ProjectMetadataJsonFileContent;
    const { targetMcu, dataEntries, editUiItemsInput } = metadata;
    const editUiItems = editUiItemsInput.map((it) => ({
      ...it,
      instruction: it.instruction ?? it.instructionLines?.join("\n") ?? "",
    }));
    return { patchingManifest: { targetMcu, dataEntries, editUiItems } };
  },
  checkPatchingManifestValidity(_manifest: PatchingManifest): string {
    return "";
  },
  checkPatchingDataBlobValidity(
    _manifest: PatchingManifest,
    _blob: PatchingDataBlob,
  ): string {
    return "";
  },
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob,
  ): FirmwareContainer {
    if (firmware.kind !== "uf2") {
      raiseError(`unsupported firmware type ${firmware.kind}`);
    }
    const modFirmwareBytes = firmwareDataInjector.patchFirmwareBinary(
      firmware.binaryBytes,
      patchingManifest,
      patchingDataBlob.editItems,
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
