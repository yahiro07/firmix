import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type FirmwarePatchingBlob = {
  entries: { marker: string; dataBytes: number[] }[];
};

export type ConfigurationEditItem = {
  key: string;
  values: string[];
};

export type PatchingDataBlob = {
  editItems: ConfigurationEditItem[];
};

export type PatchingManifest = {
  targetMcu: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};

export type FirmwareContainer = {
  kind: "uf2";
  fileName: string;
  binaryBytes_base64: string;
};

export type ImageFileContainer = {
  fileName: string;
  mimeType: string;
  fileSize: number;
  width: number;
  height: number;
  imageDataUrl: string;
};
