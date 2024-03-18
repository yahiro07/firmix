import { ProjectRealm } from "~/base/types_app_common.ts";
import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type ProjectMetadataEditUiItemInput = {
  key: string;
  label: string;
};

export type ProjectMetadataJsonFileContent = {
  projectGuid: string;
  projectName: string;
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
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};
