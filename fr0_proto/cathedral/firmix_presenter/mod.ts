import { raiseError } from "~/aux/utils/error_util.ts";
import { filePathHelper } from "~/aux/utils/file_path_helper.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import { FirmixPresenter } from "~/base/types_firmix_domain_modules.ts";
import {
  BinaryFileEntry,
  LocalAsset_Firmware,
  LocalAsset_Metadata,
  LocalAsset_Readme,
  LocalAsset_Thumbnail,
  TextFileEntry,
} from "~/base/types_local_project.ts";
import {
  FirmwareContainer,
  PatchingDataBlob,
} from "~/base/types_project_edit.ts";
import { firmixCore } from "~/cathedral/firmix_core/mod.ts";
import { imageFileLoader } from "~/cathedral/firmix_presenter/image_file_loader.ts";

const local = {
  buildAssetReadme(readmeFile: TextFileEntry | undefined): LocalAsset_Readme {
    if (!readmeFile) {
      return {
        validity: "warning",
        filePath: "readme.md",
        fileContent: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    return {
      validity: "valid",
      filePath: readmeFile.filePath,
      fileContent: readmeFile.contentText,
      errorLines: [],
    };
  },
  buildAssetMetadata(
    metadataFile: TextFileEntry | undefined
  ): LocalAsset_Metadata {
    if (!metadataFile) {
      return {
        validity: "error",
        filePath: "metadata.fm1.json",
        metadataInput: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    const metadataInput = firmixCore.loadProjectMetadataFile_json(
      metadataFile.contentText
    );

    // const patchingManifest = pickObjectMembers(metadataInput, [
    //   "targetMcu",
    //   "dataEntries",
    //   "editUiItems",
    // ]);
    const validationResult = firmixCore.validateMetadataInput(metadataInput);

    const errorLines = validationResult ? [validationResult] : [];
    const validity = errorLines.length === 0 ? "valid" : "error";
    return {
      validity,
      filePath: metadataFile.filePath,
      metadataInput: validity === "valid" ? metadataInput : undefined,
      errorLines,
    };
  },
  async buildAssetThumbnail(
    thumbnailFile: BinaryFileEntry | undefined
  ): Promise<LocalAsset_Thumbnail> {
    if (!thumbnailFile) {
      return {
        validity: "warning",
        filePath: "thumbnail.(jpg|png)",
        thumbnailContainer: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    const thumbnailContainer = await imageFileLoader.loadBinaryImageFile(
      thumbnailFile
    );
    const errorLines: string[] = [];
    const { width, height } = thumbnailContainer;
    const sizeValid = width <= 320 && height <= 320;
    if (!sizeValid) {
      errorLines.push(
        `画像の縦横のサイズを320x320以下にしてください。(現在のサイズ:${width}x${height})`
      );
    }
    const validity = errorLines.length === 0 ? "valid" : "error";
    return {
      validity,
      filePath: thumbnailFile.filePath,
      thumbnailContainer:
        (validity === "valid" && thumbnailContainer) || undefined,
      errorLines,
    };
  },
  buildAssetFirmware(
    firmwareFile: BinaryFileEntry | undefined,
    firmwareFileLoadingErrorText: string | undefined
  ): LocalAsset_Firmware {
    if (!firmwareFile || firmwareFileLoadingErrorText) {
      return {
        validity: "error",
        filePath: ".pio/build/<board_type>/firmware.uf2",
        firmwareContainer: undefined,
        errorLines: [
          firmwareFileLoadingErrorText ??
            "ファームウェアがありません。プロジェクトをビルドしてください。",
        ],
      };
    }
    const firmwareContainer: FirmwareContainer = {
      kind: "uf2",
      fileName: filePathHelper.getFileNameFromFilePath(firmwareFile.filePath),
      binaryBytes: firmwareFile.contentBytes,
    };
    return {
      validity: "valid",
      filePath: firmwareFile.filePath,
      firmwareContainer,
      errorLines: [],
    };
  },
};
export const firmixPresenter: FirmixPresenter = {
  async buildLocalDevelopmentProject(inputResources) {
    const {
      metadataFile,
      firmwareFile,
      thumbnailFile,
      readmeFile,
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
      firmwareFileLoadingErrorText,
    } = inputResources;
    const assetReadme = local.buildAssetReadme(readmeFile);
    const assetMetadata = local.buildAssetMetadata(metadataFile);
    const assetThumbnail = await local.buildAssetThumbnail(thumbnailFile);
    const assetFirmware = local.buildAssetFirmware(
      firmwareFile,
      firmwareFileLoadingErrorText
    );
    return {
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
      assetReadme,
      assetMetadata,
      assetThumbnail,
      assetFirmware,
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
  patchLocalProjectFirmware(project, editItems) {
    const {
      assetFirmware: { firmwareContainer },
      assetMetadata: { metadataInput },
    } = project;
    if (!(firmwareContainer && metadataInput)) raiseError(`invalid condition`);
    const patchingDataBlob: PatchingDataBlob = { editItems };
    return firmixCore.fabricateFirmware(
      firmwareContainer,
      metadataInput,
      patchingDataBlob
    );
  },
  splitSourceItemEditTextValues(sourceItem, text) {
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
