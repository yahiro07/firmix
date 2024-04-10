export type FirmwareFormat = "uf2";

export type InputFirmwareFormat = "uf2" | "bin" | "hex";

export type ThumbnailMimeTypes = "image/png" | "image/jpeg";

export type ProjectRealm = "general" | "keyboard";

export type ImageAssetAttrs = {
  fileSize: number;
  width: number;
  height: number;
  mimeType: ThumbnailMimeTypes;
};
