import { raiseError } from "~/aux/utils/error_util.ts";
import { FirmixCore } from "~/base/types_firmix_domain_modules.ts";
import {
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";
import {
  ProjectMetadataInput,
  ProjectMetadataJsonFileContent,
} from "~/base/types_project_metadata.ts";
import { firmwareDataInjector } from "~/cathedral/firmix_core/firmware_data_injector.ts";

export const firmixCore: FirmixCore = {
  loadProjectMetadataFile_json(fileContentText: string): ProjectMetadataInput {
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
      sourceCodeUrl,
      tags,
      dataEntries,
      editUiItems,
    };
  },
  checkPatchingManifestValidity(_manifest: PatchingManifest): string {
    return "";
  },
  checkPatchingDataBlobValidity(
    _manifest: PatchingManifest,
    _blob: PatchingDataBlob
  ): string {
    return "";
  },
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob
  ): FirmwareContainer {
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
