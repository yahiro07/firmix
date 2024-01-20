import {
  CustomDataEntry,
  CustomDataItemCore,
  EditUiItem,
} from "~/base/types_core_entity.ts";

export type ConfigurationSourceItem = {
  key: string;
  label: string;
  instruction: string;
} & CustomDataItemCore;

export type ConfigurationSourceItem_Error = {
  key: string;
  dataKind: "error";
};

export type ConfigurationSourceItemWrapper =
  | ConfigurationSourceItem
  | ConfigurationSourceItem_Error;

export type ProjectDetailDto = {
  projectId: string;
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  readmeFileContent: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
  thumbnailUrl: string;
  firmwareBinaryUrl: string;
};

export type ProjectListItemDto = {
  projectId: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  thumbnailUrl: string;
};

export type LocalProjectSubmissionInputDto = {
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  readmeFileContent: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
  thumbnailObject: { fileName: string; imageDataUrl: string };
  firmwareObject: { fileName: string; binaryBytes_base64: string };
};
