import { CustomDataItemCore } from "~/base/entity_types.ts";

export type ConfigurationSourceItem_Valid = {
  key: string;
  label: string;
  instruction: string;
} & CustomDataItemCore;

export type ConfigurationSourceItem_Error = {
  key: string;
  dataKind: "error";
};

export type ConfigurationSourceItem =
  | ConfigurationSourceItem_Valid
  | ConfigurationSourceItem_Error;

export type ConfigurationEditItem = {
  key: string;
  values: string[];
};

export type ProjectDetailDto = {
  projectId: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  configurationSourceItems: ConfigurationSourceItem[];
};
