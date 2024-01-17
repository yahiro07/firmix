import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type ProjectMetadataEditUiItemInput = {
  key: string;
  label: string;
  instruction?: string;
  instructionLines?: string[];
};

export type ProjectMetadataJsonFileContent = {
  projectGuid: string;
  projectName: string;
  introductionLines: string[];
  targetMcu: string;
  primaryTargetBoard: string;
  sourceCodeUrl: string;
  tags: string[];
  dataEntries: CustomDataEntry[];
  editUiItems: ProjectMetadataEditUiItemInput[];
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  sourceCodeUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};
