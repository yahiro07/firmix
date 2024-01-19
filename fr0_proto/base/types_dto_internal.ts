import { BinaryFileEntry, TextFileEntry } from "~/base/types_local_project.ts";

export type LocalProjectInputResources = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  metadataFile?: TextFileEntry;
  firmwareFile?: BinaryFileEntry;
  readmeFile?: TextFileEntry;
  thumbnailFile?: BinaryFileEntry;
  firmwareFileLoadingErrorText?: string;
};
