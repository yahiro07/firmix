import { FirmwareContainer, ImageFileContainer } from "./types_project_edit";
import { ProjectMetadataInput } from "./types_project_metadata";

export type TextFileEntry = {
  // type: "text";
  filePath: string;
  contentText: string;
};

export type BinaryFileEntry = {
  // type: "binary";
  filePath: string;
  contentBytes: Uint8Array;
};

export type BinaryFileEntryWithTimestamp = BinaryFileEntry & {
  lastModified: number;
};

type LocalAssetValidity = "valid" | "warning" | "error";

export type LocalAssetBase = {
  validity: LocalAssetValidity;
  filePath: string;
  errorLines: string[];
};

export type LocalAsset_Readme = LocalAssetBase & {
  fileContent: string | undefined;
};

export type LocalAsset_Metadata = LocalAssetBase & {
  fileContent: string | undefined;
  boardFileContent: string | undefined;
  metadataInput: ProjectMetadataInput | undefined;
};

export type LocalAsset_Thumbnail = LocalAssetBase & {
  thumbnailContainer: ImageFileContainer | undefined;
};

export type LocalAsset_Firmware = LocalAssetBase & {
  firmwareContainer: FirmwareContainer | undefined;
  lastModified: number;
};

export type LocalDevelopmentProject = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  assetReadme: LocalAsset_Readme;
  assetMetadata: LocalAsset_Metadata;
  assetThumbnail: LocalAsset_Thumbnail;
  assetFirmware: LocalAsset_Firmware;
  canSubmit: boolean;
  modFirmwareFilePath?: string;
};
