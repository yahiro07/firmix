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
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  configurationSourceItemWrappers: ConfigurationSourceItemWrapper[];
};

export type LocalProjectSubmissionInputDto = {
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
  readmeFileContent: string;
  thumbnailObject: {
    fileName: string;
    binaryBytes: Uint8Array;
    mimeType: string;
  };
  firmwareObject: { fileName: string; binaryBytes: Uint8Array };
};
