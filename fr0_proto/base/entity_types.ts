export type CustomDataItem = {
  key: string;
  dataKind: "pin";
  dataCount: number;
};

export type CustomDataEntry = {
  marker: string;
  items: CustomDataItem[];
};

export type EditUiItem = {
  key: string;
  label: string;
  instruction: string;
};

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
