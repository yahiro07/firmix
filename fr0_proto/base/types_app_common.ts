export type ProjectRepositoryInfo = {
  repositoryUrl: string;
  repositoryProjectPath: string;
  ownerName: string;
  ownerIconUrl: string;
};

export type ProjectTab = "info" | "editor";

export type FirmwareFormat = "uf2";

export type ThumbnailMimeTypes = "image/png" | "image/jpeg";

export type ImageAssetAttrs = {
  fileSize: number;
  width: number;
  height: number;
  mimeType: ThumbnailMimeTypes;
};
