import {
  FirmwareContainer,
  ImageFileContainer,
  PatchingManifest,
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

export type LocalDevelopmentProject = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle: FileSystemDirectoryHandle;
  assetFilePaths: {
    metadata: string;
    firmware: string;
    thumbnail: string;
    readme: string;
    modFirmware?: string;
  };
  firmwareContainer: FirmwareContainer;
  thumbnailImageContainer: ImageFileContainer;
  readmeFileContent: string;
  metadataInput: ProjectMetadataInput;
  patchingManifest: PatchingManifest;
};

export type LocalDevelopmentWork_Loaded = {
  state: "loaded";
  project: LocalDevelopmentProject;
};
export type LocalDevelopmentWork_Error = {
  state: "error";
  message: string;
};

export type LocalDevelopmentWork =
  | LocalDevelopmentWork_Loaded
  | LocalDevelopmentWork_Error;
