import {
  CustomDataEntry,
  CustomDataItem,
  EditUiItem,
} from "~/base/types_core_entity.ts";

export type ConfigurationSourceItem = {
  label: string;
  instruction: string;
} & CustomDataItem;

export type ConfigurationSourceItem_Error = {
  key: string;
  dataKind: "error";
  message: string;
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
  published: boolean;
  automated: boolean;
  firmwareRevision: number;
  firmwareUpdateAt: number;
  updateAt: number;
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
