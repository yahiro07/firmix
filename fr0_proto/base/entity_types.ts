export type CustomDataItemCore =
  | { dataKind: "u8"; dataCount: number }
  | { dataKind: "i8"; dataCount: number }
  | { dataKind: "pins"; pinCount: number }
  | { dataKind: "vl_pins"; pinsCapacity: number };

export type CustomDataItem =
  & { key: string }
  & CustomDataItemCore;

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
