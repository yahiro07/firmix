export type CustomDataEntry = {
  "marker": string;
  "dataKind": "pin";
  "dataCount": number;
};

export type ProjectDetail = {
  projectId: string;
  projectName: string;
  metaData: {
    "targetMcu": string;
    "referenceBoard": string;
    "dataEntries": CustomDataEntry[];
  };
};

export type CustomDataEditItem = {
  marker: string;
  dataBytes: number[];
};
