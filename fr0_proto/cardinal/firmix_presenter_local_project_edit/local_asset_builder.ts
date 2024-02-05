import { filePathHelper } from "~/auxiliaries/utils/file_path_helper.ts";
import { encodeBinaryBase64 } from "~/auxiliaries/utils/utils_binary.ts";
import {
  BinaryFileEntry,
  LocalAsset_Firmware,
  LocalAsset_Metadata,
  LocalAsset_Readme,
  LocalAsset_Thumbnail,
  TextFileEntry,
} from "~/base/types_local_project.ts";
import { FirmwareContainer } from "~/base/types_project_edit.ts";
import { firmixCore_projectLoader } from "~/cardinal/firmix_core_project_loader/mod.ts";
import { imageFileLoader } from "~/cardinal/firmix_presenter_common_modules/image_file_loader.ts";

export const localAssetBuilder = {
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
        fileContent: undefined,
        metadataInput: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    const { metadataInput, errorLines } =
      firmixCore_projectLoader.loadProjectMetadataFile_json(
        metadataFile.contentText
      );
    const validity = errorLines.length === 0 ? "valid" : "error";
    return {
      validity,
      filePath: metadataFile.filePath,
      fileContent: metadataFile.contentText,
      metadataInput: validity === "valid" ? metadataInput : undefined,
      errorLines,
    };
  },
  async buildAssetThumbnail(
    thumbnailUrl: string | undefined
  ): Promise<LocalAsset_Thumbnail> {
    if (!thumbnailUrl) {
      return {
        validity: "warning",
        filePath: "",
        thumbnailContainer: undefined,
        errorLines: ["サムネイルの指定がありません。"],
      };
    }
    const thumbnailContainer = await imageFileLoader.loadOnlineImageAsset(
      thumbnailUrl
    );
    const errorLines: string[] = [];

    const thumbnailValidationRes =
      firmixCore_projectLoader.validateOnlineThumbnailOnFrontend(
        thumbnailContainer
      );

    errorLines.push(...thumbnailValidationRes);

    const validity = errorLines.length === 0 ? "valid" : "error";
    return {
      validity,
      filePath: thumbnailUrl,
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
      binaryBytes_base64: encodeBinaryBase64(firmwareFile.contentBytes),
    };
    return {
      validity: "valid",
      filePath: firmwareFile.filePath,
      firmwareContainer,
      errorLines: [],
    };
  },
};
