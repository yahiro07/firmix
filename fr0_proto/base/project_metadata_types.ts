import { CustomDataEntry } from "~/base/entity_types.ts";

export type EditUiItemInput = {
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
  dataEntries: CustomDataEntry[];
  editUiItemsInput: EditUiItemInput[];
};
