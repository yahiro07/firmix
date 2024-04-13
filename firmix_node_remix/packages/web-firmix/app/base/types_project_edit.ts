import {
  FirmwareFormat,
  ThumbnailMimeTypes,
} from "web-firmix/app/base/types_app_common";

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
