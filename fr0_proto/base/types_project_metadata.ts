import { ProjectRealm } from "~/base/types_app_common.ts";
import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type ProjectMetadataEditUiItemInput = {
  key: string;
  label: string;
};

export type ProjectBoardJsonFileContent = {
  pinNumbersMap: Record<string, number>;
};

export type ProjectMetadataJsonFileContent = {
  projectGuid: string;
  projectName: string;
  parentProjectGuid?: string;
  variationName?: string;
  introductionLines: string[];
  targetMcu: string;
  primaryTargetBoard: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: ProjectMetadataEditUiItemInput[];
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  parentProjectGuid: string;
  variationName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
  pinNumbersMap: Record<string, number>;
};
