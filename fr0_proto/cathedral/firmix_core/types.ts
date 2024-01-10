import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { CustomDataEntry, EditUiItem } from "~/base/entity_types.ts";

export type PatchingManifest = {
  targetMcu: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};

export type PatchingDataBlob = {
  items: ConfigurationEditItem[];
};

export type ProjectMetadataInput = {
  patchingManifest: PatchingManifest;
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
    manifest: PatchingManifest,
    blob: PatchingDataBlob,
  ): FirmwareContainer;
};
