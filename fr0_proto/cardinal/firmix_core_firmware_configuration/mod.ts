import { raiseError } from "~/aux/utils/error_util.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
} from "~/base/types_dto.ts";
import { PatchingManifest } from "~/base/types_project_edit.ts";

export const firmixCore_firmwareConfiguration = {
  buildConfigurationSourceItems(
    patchingManifest: PatchingManifest
  ): ConfigurationSourceItemWrapper[] {
    const dataItems = patchingManifest.dataEntries.map((it) => it.items).flat();
    return patchingManifest.editUiItems.map((editUiItem) => {
      const { key, label, instruction } = editUiItem;
      const dataItem = dataItems.find((it) => it.key === key);
      if (!dataItem) {
        return { key, dataKind: "error" };
      }
      const { dataKind } = dataItem;
      if (dataKind === "u8" || dataKind === "i8") {
        const { dataCount } = dataItem;
        return {
          key,
          dataKind,
          dataCount,
          label,
          instruction,
        };
      } else if (dataKind === "pins") {
        const { pinCount } = dataItem;
        return {
          key,
          dataKind,
          pinCount,
          label,
          instruction,
        };
      } else if (dataKind === "vl_pins") {
        const { pinsCapacity } = dataItem;
        return {
          key,
          dataKind,
          pinsCapacity,
          label,
          instruction,
        };
      } else {
        raiseError(`unsupported data kind ${dataKind}`);
      }
    });
  },
  splitSourceItemEditTextValues(
    sourceItem: ConfigurationSourceItem,
    text: string
  ): string[] {
    const { label, dataKind } = sourceItem;
    if (dataKind === "vl_pins" && text === "") {
      return [];
    }
    if (!text) {
      raiseError(`${label}: 値を入力してください`);
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
      if (values.length !== sourceItem.pinCount) {
        const addNote = values.length === 1 && sourceItem.pinCount >= 2;
        raiseError(
          `${label}: ピンの数が定義と一致しません ${values.length}/${
            sourceItem.pinCount
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

    if (dataKind === "pins") {
      for (const pinName of values) {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(
            `${label}: ${pinName}はピンの名前として正しくありません。gp0,gp1などの形式で入力してください。`
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
    return values;
  },
};
