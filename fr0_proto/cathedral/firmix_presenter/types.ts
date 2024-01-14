import {
  ConfigurationEditItem,
  ConfigurationSourceItem,
  ConfigurationSourceItem_Valid,
} from "~/base/dto_types.ts";
import {
  FirmwareContainer,
  PatchingManifest,
  ProjectMetadataInput,
} from "~/cathedral/firmix_core/types.ts";

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
    modFirmware?: string;
  };
  firmwareContainer: FirmwareContainer;
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

export type FirmixPresenter = {
  buildLocalDevelopmentProject(inputResources: {
    projectRootDirectoryHandle: FileSystemDirectoryHandle;
    firmwareDirectoryHandle: FileSystemDirectoryHandle;
    metadataFile: TextFileEntry;
    firmwareFile: BinaryFileEntry;
  }): LocalDevelopmentProject;
  buildConfigurationSourceItems(
    patchingManifest: PatchingManifest,
  ): ConfigurationSourceItem[];
  patchLocalProjectFirmware(
    project: LocalDevelopmentProject,
    editItems: ConfigurationEditItem[],
  ): FirmwareContainer;
  splitSourceItemEditTextValues(
    sourceItem: ConfigurationSourceItem_Valid,
    text: string,
  ): string[];
};
