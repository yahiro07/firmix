import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type ProjectEntity = {
  projectId: string;
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};
