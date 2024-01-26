import { FirmwareFormat } from "~/base/types_app_common.ts";
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

export type LocalProjectSubmissionPayload = {
  readmeFileContent: string;
  metadataFileContent: string;
  firmwareFormat: FirmwareFormat;
  firmwareFileBytes_base64: string;
};

export type ProjectSubmissionArgument = {
  apiKey: string;
  readmeFileContent: string;
  metadataFileContent: string;
  firmwareFormat: FirmwareFormat;
  firmwareFileBytes: Uint8Array;
};
