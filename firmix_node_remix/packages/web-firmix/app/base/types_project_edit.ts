import {
  FirmwareFormat,
  ThumbnailMimeTypes,
} from "@m/web-firmix/base/types_app_common.ts";
import {
  CustomDataEntry,
  EditUiItem,
} from "@m/web-firmix/base/types_core_entity.ts";

export type FirmwarePatchingBlob = {
  entries: {
    marker: string;
    dataBytes: number[];
    ensurePatched: boolean;
    markerNullTerminated: boolean;
  }[];
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
  pinNumbersMap: Record<string, number>;
};

export type FirmwareContainer = {
  kind: FirmwareFormat;
  fileName: string;
  binaryBytes_base64: string;
};

export type ImageFileContainer = {
  fileName: string;
  imageDataUrl: string;
  mimeType: ThumbnailMimeTypes;
  fileSize: number;
  width: number;
  height: number;
};
