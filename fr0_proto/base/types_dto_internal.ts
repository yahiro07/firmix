import { BinaryFileEntry, TextFileEntry } from "~/base/types_local_project.ts";

export type LoginUserClue = {
  userId: string;
  userName: string;
  avatarUrl: string;
};

export type LoginUser = LoginUserClue;

export type LocalProjectInputResources = {
  projectRootDirectoryHandle: FileSystemDirectoryHandle;
  firmwareDirectoryHandle?: FileSystemDirectoryHandle;
  metadataFile?: TextFileEntry;
  firmwareFile?: BinaryFileEntry;
  readmeFile?: TextFileEntry;
  thumbnailFile?: BinaryFileEntry;
  firmwareFileLoadingErrorText?: string;
};
