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

type LocalProjectAsset<T> =
  | ({ state: "loaded"; filepath: string } & T)
  | ({
      state: "warning" | "error";
      filePath: string;
      errorLines: string[];
    } & { [K in keyof T]: undefined });

export type LocalAsset_Firmware = LocalProjectAsset<{
  firmware: FirmwareContainer;
}>;

export type LocalAssetBase = {
  validity: LocalAssetValidity;
  filePath: string;
  errorLines: string[];
};

export type LocalAsset_Readme = {
  validity: LocalAssetValidity;
  filePath: string;
  fileContent: string;
  errorLines: string[];
};

export type LocalAsset_Metadata = {
  validity: LocalAssetValidity;
  filePath: string;
  metadataInput: ProjectMetadataInput | undefined;
  errorLines: string[];
};

export type LocalAsset_Thumbnail = {
  validity: LocalAssetValidity;
  filePath: string;
  thumbnailContainer: ImageFileContainer | undefined;
  errorLines: string[];
};

export type LocalDevelopmentProject = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle: FileSystemDirectoryHandle;
  firmwareContainer: FirmwareContainer;
  // thumbnailImageContainer: ImageFileContainer;
  // readmeFileContent: string;
  // metadataInput: ProjectMetadataInput;
  // patchingManifest: PatchingManifest;
  assetFilePaths: {
    // metadata: string;
    firmware: string;
    // thumbnail: string;
    // readme: string;
    modFirmware?: string;
  };
  assetReadme: LocalAsset_Readme;
  assetMetadata: LocalAsset_Metadata;
  assetThumbnail: LocalAsset_Thumbnail;
};

export type LocalDevelopmentProject2 = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  assetFirmware: LocalAsset_Firmware;
  assetThumbnail: LocalAsset_Thumbnail;
  assetReadme: LocalAsset_Readme;
  assetMetadata: LocalAsset_Metadata;
};

// export type LocalDevelopmentWork_Loaded = {
//   state: "loaded";
//   project: LocalDevelopmentProject;
// };
// export type LocalDevelopmentWork_Error = {
//   state: "error";
//   message: string;
// };

// export type LocalDevelopmentWork =
//   | LocalDevelopmentWork_Loaded
//   | LocalDevelopmentWork_Error;
