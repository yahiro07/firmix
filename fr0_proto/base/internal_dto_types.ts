import { CustomDataEntry, EditUiItem } from "~/base/entity_types.ts";

export type FirmwarePatchingBlob = {
  entries: {
    marker: string;
    dataBytes: number[];
  }[];
};

export type ProjectMetadataJsonFileContent = {
  projectGuid: string;
  projectName: string;
  introductionLines: string[];
  targetMcu: string;
  primaryTargetBoard: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
};
