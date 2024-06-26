import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { padZeros, seqNumbers } from "@mx/auxiliaries/utils/utils_array";
import { CustomDataItem } from "@mx/web-kfx/app/base/types_core_entity";
import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
} from "@mx/web-kfx/app/base/types_dto";
import { PatchingManifest } from "@mx/web-kfx/app/base/types_project_edit";

export const firmixCore_firmwareConfiguration = {
  buildConfigurationSourceItems(
    patchingManifest: PatchingManifest
  ): ConfigurationSourceItemWrapper[] {
    const dataItems = patchingManifest.dataEntries.map((it) => it.items).flat();
    return patchingManifest.editUiItems.map((editUiItem) => {
      const { key, label } = editUiItem;
      const dataItem = dataItems.find((it) => it.key === key);
      if (!dataItem) {
        return {
          key,
          dataKind: "error",
          message: `dataEntry item not found for ${key}`,
        };
      }
      const { dataKind } = dataItem;
      if (dataKind === "u8" || dataKind === "i8") {
        const { dataCount, required, fallbackValues } = dataItem;
        return {
          key,
          dataKind,
          dataCount,
          label,
          required,
          fallbackValues,
        };
      } else if (dataKind === "pins") {
        const { pinsCount, required } = dataItem;
        return {
          key,
          dataKind,
          pinsCount,
          label,
          required,
        };
      } else if (dataKind === "vl_pins") {
        const { pinsCapacity, required } = dataItem;
        return {
          key,
          dataKind,
          pinsCapacity,
          label,
          required,
        };
      } else if (dataKind === "vl_text") {
        const { textCapacity, required } = dataItem;
        return {
          key,
          dataKind,
          textCapacity,
          label,
          required,
        };
      } else {
        return {
          key,
          dataKind: "error",
          message: `unsupported data kind ${dataKind}`,
        };
      }
    });
  },
  splitSourceItemEditTextValues(
    sourceItem: ConfigurationSourceItem,
    text: string,
    pinNumbersMap: Record<string, number>
  ): string[] {
    const { label, dataKind, required } = sourceItem;

    if (text.trim() === "") {
      if (required) {
        raiseError(`${label}: 値を入力してください`);
      } else if (
        (dataKind === "i8" || dataKind === "u8") &&
        sourceItem.fallbackValues
      ) {
        return sourceItem.fallbackValues.map((it) => it.toString());
      } else {
        return [];
      }
    }

    const values = text.split(",").map((it) => it.trim());
    if (dataKind === "u8" || dataKind === "i8") {
      if (values.length !== sourceItem.dataCount) {
        raiseError(
          `${label}: データの数が定義と一致しません ${values.length}/${sourceItem.dataCount}`
        );
      }
    }
    if (dataKind === "pins") {
      if (values.length !== sourceItem.pinsCount) {
        const addNote = values.length === 1 && sourceItem.pinsCount >= 2;
        raiseError(
          `${label}: ピンの数が定義と一致しません ${values.length}/${
            sourceItem.pinsCount
          }${addNote && " ピン名をコンマ区切りで入力してください"}`
        );
      }
    }
    if (dataKind === "vl_pins") {
      if (values.length > sourceItem.pinsCapacity) {
        raiseError(
          `${label}: ピンの数が多すぎます ${values.length}/${sourceItem.pinsCapacity}`
        );
      }
    }

    if (dataKind === "pins" || dataKind === "vl_pins") {
      for (const pinName of values) {
        const pinNumber = mapPinNameToPinNumber(pinName, pinNumbersMap);
        if (pinNumber === undefined) {
          const allPinNames = Object.keys(pinNumbersMap).join(",");
          raiseError(
            `${label}: ${pinName}はピンの名前として正しくありません。\n${allPinNames}\nのどれかを指定してください。`
          );
        }
      }
    }
    if (dataKind === "u8" || dataKind === "i8") {
      const value = parseInt(text);
      if (!isFinite(value)) {
        raiseError(`${label}: ${text}は整数値として正しくありません`);
      }
      if (dataKind === "u8" && !(0 <= value && value <= 255)) {
        raiseError(
          `${label}: 範囲外の値${value}が見つかりました。0~255の範囲で値を指定してください。`
        );
      }
      if (dataKind === "i8" && !(-128 <= value && value <= 127)) {
        raiseError(
          `${label}: 範囲外の値${value}が見つかりました。-128~127の範囲で値を指定してください。`
        );
      }
    }
    if (dataKind === "text") {
      const numBytes = new Blob([text]).size;
      if (numBytes !== sourceItem.textLength) {
        raiseError(
          `${label}: 文字数が定義に一致しません。${sourceItem.textLength}文字にしてください。`
        );
      }
    }
    if (dataKind === "vl_text") {
      const numBytes = new Blob([text]).size;
      if (numBytes > sourceItem.textCapacity) {
        raiseError(
          `${label}: 文字数が多すぎます。${sourceItem.textCapacity}文字以内にしてください。`
        );
      }
    }
    return values;
  },
  serializeEditData(
    customDataItem: CustomDataItem,
    textValues: string[],
    pinNumbersMap: Record<string, number>
  ): number[] {
    const { key, dataKind } = customDataItem;
    if (dataKind === "u8" || dataKind === "i8") {
      const { dataCount } = customDataItem;
      if (textValues.length !== dataCount) {
        raiseError(`invalid data count for ${key}`);
      }
      const byteValues = textValues.map((text) => {
        const value = parseInt(text);
        if (!isFinite(value)) {
          raiseError(`invalid value ${value}`);
        }
        if (dataKind === "u8" && !(0 <= value && value <= 255)) {
          raiseError(`invalid value ${value}, it must be in range 0~255`);
        }
        if (dataKind === "i8" && !(-128 <= value && value <= 127)) {
          raiseError(`invalid value ${value}, it must be in range -128~127`);
        }
        return value < 0 ? 128 + value : value;
      });
      return byteValues;
    } else if (dataKind === "pins") {
      const { pinsCount } = customDataItem;
      if (textValues.length === 0) {
        return seqNumbers(pinsCount).map(() => -1);
      }
      if (textValues.length !== pinsCount) {
        raiseError(`invalid pin count for ${key}`);
      }
      const pinNumbers = textValues.map((pinName) => {
        const pinNumber = mapPinNameToPinNumber(pinName, pinNumbersMap);
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return pinNumbers;
    } else if (dataKind === "vl_pins") {
      const { pinsCapacity } = customDataItem;
      if (textValues.length > pinsCapacity) {
        raiseError(`too many pins for ${key}`);
      }
      const pinNumbers = textValues.map((pinName) => {
        const pinNumber = mapPinNameToPinNumber(pinName, pinNumbersMap);
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return [pinNumbers.length, ...padZeros(pinNumbers, pinsCapacity)];
    } else if (dataKind === "text") {
      const { textLength } = customDataItem;
      const bytes = new TextEncoder().encode(textValues[0]);
      if (bytes.byteLength != textLength) {
        raiseError(`invalid text length for ${key}`);
      }
      return [...bytes, 0];
    } else if (dataKind === "vl_text") {
      const { textCapacity } = customDataItem;
      const bytes = new TextEncoder().encode(textValues[0]);
      if (bytes.byteLength > textCapacity) {
        raiseError(`text too long for ${key}`);
      }
      return [...padZeros([...bytes], textCapacity), 0];
    } else {
      raiseError(`unsupported data kind ${dataKind}`);
    }
  },
  getCustomDataItemFillingDataLength(customDataItem: CustomDataItem): number {
    const { dataKind } = customDataItem;
    if (dataKind === "u8" || dataKind === "i8") {
      return customDataItem.dataCount;
    } else if (dataKind === "pins") {
      return customDataItem.pinsCount;
    } else if (dataKind === "vl_pins") {
      return customDataItem.pinsCapacity + 1;
    } else if (dataKind === "text") {
      return customDataItem.textLength + 1;
    } else if (dataKind === "vl_text") {
      return customDataItem.textCapacity + 1;
    } else {
      raiseError(`unsupported data kind ${dataKind}`);
    }
  },
};

function mapPinNameToPinNumber(
  pinName: string,
  pinNumbersMap: Record<string, number>
): number | undefined {
  return pinNumbersMap[pinName] ?? pinNumbersMap[pinName.toUpperCase()];
}
