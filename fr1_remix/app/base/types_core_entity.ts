export type CustomDataItemCore =
  | { dataKind: "u8"; dataCount: number; fallbackValues?: number[] }
  | { dataKind: "i8"; dataCount: number; fallbackValues?: number[] }
  | { dataKind: "pins"; pinsCount: number }
  | { dataKind: "vl_pins"; pinsCapacity: number }
  | { dataKind: "text"; textLength: number }
  | { dataKind: "vl_text"; textCapacity: number };

export type CustomDataItem = {
  key: string;
  required?: boolean;
} & CustomDataItemCore;

export type CustomDataEntry = {
  marker: string;
  items: CustomDataItem[];
};

export type EditUiItem = {
  key: string;
  label: string;
};
