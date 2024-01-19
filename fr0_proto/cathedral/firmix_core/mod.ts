import { raiseError } from "~/aux/utils/error_util.ts";
import { FirmixCore } from "~/base/types_firmix_domain_modules.ts";
import {
  PatchingDataBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";
import { ProjectMetadataJsonFileContent } from "~/base/types_project_metadata.ts";
import { firmwareDataInjector } from "~/cathedral/firmix_core/firmware_data_injector.ts";

export const firmixCore: FirmixCore = {
  loadProjectMetadataFile_json(fileContentText) {
    const metadata = JSON.parse(
      fileContentText
    ) as ProjectMetadataJsonFileContent;
    const {
      projectGuid,
      projectName,
      introductionLines,
      targetMcu,
      primaryTargetBoard,
      sourceCodeUrl,
      tags,
      dataEntries,
      editUiItems: editUiItemsInput,
    } = metadata;
    const introduction = introductionLines.join("\n");
    const editUiItems = editUiItemsInput.map((it) => ({
      ...it,
      instruction: it.instruction ?? it.instructionLines?.join("\n") ?? "",
    }));
    return {
      projectGuid,
      projectName,
      introduction,
      targetMcu,
      primaryTargetBoard,
      tags,
      sourceCodeUrl,
      dataEntries,
      editUiItems,
    };
  },
  validateMetadataInput(metadataInput) {
    if (!metadataInput.tags) {
      return `missing field: tags`;
    }
    return "";
  },
  checkPatchingManifestValidity(_manifest: PatchingManifest) {
    return "";
  },
  checkPatchingDataBlobValidity(
    _manifest: PatchingManifest,
    _blob: PatchingDataBlob
  ) {
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
