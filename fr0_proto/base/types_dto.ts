import { ProjectRealm } from "~/base/types_app_common.ts";
import {
  CustomDataEntry,
  CustomDataItem,
  EditUiItem,
} from "~/base/types_core_entity.ts";

export type ConfigurationSourceItem = {
  label: string;
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
  userId: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  realm: ProjectRealm;
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
  userName: string;
  userAvatarUrl: string;
};

export type ProjectListItemDto = {
  projectId: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  thumbnailUrl: string;
  published: boolean;
  userName: string;
  userAvatarUrl: string;
};
