import {
  ConfigurationEditItem,
  ConfigurationSourceItem,
} from "~/base/dto_types.ts";
import {
  FirmwareContainer,
  PatchingManifest,
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
  assetFilePaths: {
    metadata: string;
    firmware: string;
  };
  firmwareContainer: FirmwareContainer;
  patchingManifest: PatchingManifest;
};

export type LocalDevelopmentWork = {
  state: "loaded";
  project: LocalDevelopmentProject;
} | {
  state: "error";
  message: string;
};

export type FirmixPresenter = {
  buildLocalDevelopmentProject(inputResources: {
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
};
