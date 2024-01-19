import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
} from "~/base/types_dto.ts";
import {
  BinaryFileEntry,
  LocalDevelopmentProject,
  TextFileEntry,
} from "~/base/types_local_project.ts";
import {
  ConfigurationEditItem,
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";
import { ProjectMetadataInput } from "~/base/types_project_metadata.ts";

export type FirmixCore = {
  loadProjectMetadataFile_json(fileContentText: string): ProjectMetadataInput;
  validateMetadataInput(metadataInput: ProjectMetadataInput): string;
  checkPatchingManifestValidity(manifest: PatchingManifest): string;
  checkPatchingDataBlobValidity(
    manifest: PatchingManifest,
    blob: PatchingDataBlob
  ): string;
  fabricateFirmware(
    firmware: FirmwareContainer,
    patchingManifest: PatchingManifest,
    patchingDataBlob: PatchingDataBlob
  ): FirmwareContainer;
};

export type LocalProjectInputResources = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  metadataFile?: TextFileEntry;
  firmwareFile?: BinaryFileEntry;
  readmeFile?: TextFileEntry;
  thumbnailFile?: BinaryFileEntry;
  firmwareFileLoadingErrorText?: string;
};

export type FirmixPresenter = {
  buildLocalDevelopmentProject(
    inputResources: LocalProjectInputResources
  ): Promise<LocalDevelopmentProject>;
  buildConfigurationSourceItems(
    patchingManifest: PatchingManifest
  ): ConfigurationSourceItemWrapper[];
  patchLocalProjectFirmware(
    project: LocalDevelopmentProject,
    editItems: ConfigurationEditItem[]
  ): FirmwareContainer;
  splitSourceItemEditTextValues(
    sourceItem: ConfigurationSourceItem,
    text: string
  ): string[];
};
