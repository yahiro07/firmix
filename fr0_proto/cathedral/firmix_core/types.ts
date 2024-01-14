import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { CustomDataEntry, EditUiItem } from "~/base/entity_types.ts";

export type PatchingManifest = {
  targetMcu: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};

export type PatchingDataBlob = {
  editItems: ConfigurationEditItem[];
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};

export type FirmwareContainer = {
  kind: "uf2";
  fileName: string;
  binaryBytes: Uint8Array;
};

export type FirmixCore = {
  loadProjectMetadataFile_json(fileContentText: string): ProjectMetadataInput;
  checkPatchingManifestValidity(manifest: PatchingManifest): string;
  checkPatchingDataBlobValidity(
    manifest: PatchingManifest,
    blob: PatchingDataBlob,
  ): string;
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob,
  ): FirmwareContainer;
};
