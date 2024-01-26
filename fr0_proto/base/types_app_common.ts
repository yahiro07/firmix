export type ProjectRepositoryInfo = {
  repositoryUrl: string;
  repositoryName: string;
  ownerName: string;
  ownerIconUrl: string;
};

export type ProjectTab = "info" | "editor";

export type FirmwareFormat = "uf2";

export type ImageAssetAttrs = {
  fileSize: number;
  width: number;
  height: number;
};
