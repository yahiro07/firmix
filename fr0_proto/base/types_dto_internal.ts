import {
  FirmwareFormat,
  InputFirmwareFormat,
} from "~/base/types_app_common.ts";

export type LoginUserClue = {
  userId: string;
  userName: string;
  avatarUrl: string;
};

export type LoginUser = LoginUserClue;

export type LocalProjectSubmissionPayload = {
  readmeFileContent: string;
  projectFileContent: string;
  boardFileContent: string;
  firmwareFormat: FirmwareFormat;
  firmwareFileBytes_base64: string;
  thumbnailFileBytes_base64: string;
};

export type ProjectSubmissionArgument = {
  apiKey: string;
  readmeFileContent: string;
  projectFileContent: string;
  boardFileContent: string;
  firmwareFormat: InputFirmwareFormat;
  firmwareFileBytes: Uint8Array;
  thumbnailFileBytes: Uint8Array;
};
