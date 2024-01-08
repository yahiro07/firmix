export type ConfigurationSourceItem_Valid = {
  key: string;
  dataKind: "pin";
  dataCount: number;
  label: string;
  instruction: string;
};
export type ConfigurationSourceItem_Error = {
  key: string;
  dataKind: "error";
};

export type ConfigurationSourceItem =
  | ConfigurationSourceItem_Valid
  | ConfigurationSourceItem_Error;

export type ConfigurationEditItem = {
  key: string;
  dataKind: "pin";
  pins: string[];
};

export type ProjectDetailDto = {
  projectId: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  configurationSourceItems: ConfigurationSourceItem[];
};
