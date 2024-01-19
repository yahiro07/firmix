import {
  FirmwareContainer,
  ImageFileContainer,
} from "~/base/types_project_edit.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";

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
  metadataInput: ProjectMetadataInput | undefined;
};

export type LocalAsset_Thumbnail = LocalAssetBase & {
  thumbnailContainer: ImageFileContainer | undefined;
};

export type LocalAsset_Firmware = LocalAssetBase & {
  firmwareContainer: FirmwareContainer | undefined;
};

export type LocalDevelopmentProject = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  assetReadme: LocalAsset_Readme;
  assetMetadata: LocalAsset_Metadata;
  assetThumbnail: LocalAsset_Thumbnail;
  assetFirmware: LocalAsset_Firmware;
  modFirmwareFilePath?: string;
};
