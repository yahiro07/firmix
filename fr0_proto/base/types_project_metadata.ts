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
  thumbnailUrl: string;
  introductionLines: string[];
  targetMcu: string;
  primaryTargetBoard: string;
  repositoryUrl: string;
  tags: string[];
  dataEntries: CustomDataEntry[];
  editUiItems: ProjectMetadataEditUiItemInput[];
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  thumbnailUrl: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};
