import { raiseError } from "~/aux/utils/error_util.ts";
import { filePathHelper } from "~/aux/utils/file_path_helper.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import { firmixCore } from "~/cathedral/firmix_core/mod.ts";
import {
  FirmwareContainer,
  PatchingDataBlob,
} from "~/cathedral/firmix_core/types.ts";
import {
  FirmixPresenter,
  LocalDevelopmentProject,
} from "~/cathedral/firmix_presenter/types.ts";

export const firmixPresenter: FirmixPresenter = {
  buildLocalDevelopmentProject(inputResources): LocalDevelopmentProject {
    const {
      metadataFile,
      firmwareFile,
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
    } = inputResources;
    const { patchingManifest } = firmixCore.loadProjectMetadataFile_json(
      metadataFile.contentText,
    );
    const validationResult = firmixCore.checkPatchingManifestValidity(
      patchingManifest,
    );
    if (validationResult) raiseError(validationResult);
    const firmwareContainer: FirmwareContainer = {
      kind: "uf2",
      fileName: filePathHelper.getFileNameFromFilePath(firmwareFile.filePath),
      binaryBytes: firmwareFile.contentBytes,
    };
    return {
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
      firmwareContainer,
      patchingManifest,
      assetFilePaths: {
        firmware: firmwareFile.filePath,
        metadata: metadataFile.filePath,
      },
    };
  },
  buildConfigurationSourceItems(patchingManifest) {
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
        const { maxPinCount } = dataItem;
        return {
          key,
          dataKind,
          maxPinCount,
          label,
          instruction,
        };
      } else {
        raiseError(`unsupported data kind ${dataKind}`);
      }
    });
  },
  patchLocalProjectFirmware(project, editItems) {
    const { firmwareContainer, patchingManifest } = project;
    const patchingDataBlob: PatchingDataBlob = { editItems };
    return firmixCore.fabricateFirmware(
      firmwareContainer,
      patchingManifest,
      patchingDataBlob,
    );
  },
  splitSourceItemEditTextValues(
    sourceItem,
    text,
  ) {
    const { label, dataKind } = sourceItem;
    if (dataKind === "vl_pins" && text === "") {
      return [];
    }
    if (!text) {
      raiseError(
        `${label}: 値を入力してください`,
      );
    }
    const values = text.split(",").map((it) => it.trim());
    if (dataKind === "u8" || dataKind === "i8") {
      if (values.length !== sourceItem.dataCount) {
        raiseError(
          `${label}: データの数が定義と一致しません ${values.length}/${sourceItem.dataCount}`,
        );
      }
    }
    if (dataKind === "pins") {
      if (values.length !== sourceItem.pinCount) {
        const addNote = values.length === 1 &&
          sourceItem.pinCount >= 2;
        raiseError(
          `${label}: ピンの数が定義と一致しません ${values.length}/${sourceItem.pinCount}${
            addNote && " ピン名をコンマ区切りで入力してください"
          }`,
        );
      }
    }
    if (dataKind === "vl_pins") {
      if (values.length > sourceItem.maxPinCount) {
        raiseError(
          `${label}: ピンの数が多すぎます ${values.length}/${sourceItem.maxPinCount}`,
        );
      }
    }

    if (dataKind === "pins") {
      for (const pinName of values) {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(
            `${label}: ${pinName}はピンの名前として正しくありません。gp0,gp1などの形式で入力してください。`,
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
          `${label}: 範囲外の値${value}が見つかりました。0~255の範囲で値を指定してください。`,
        );
      }
      if (dataKind === "i8" && !(-128 <= value && value <= 127)) {
        raiseError(
          `${label}: 範囲外の値${value}が見つかりました。-128~127の範囲で値を指定してください。`,
        );
      }
    }
    return values;
  },
};
