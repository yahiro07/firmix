import { encodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { filePathHelper } from "auxiliaries/utils/file_path_helper.ts";
import {
  BinaryFileEntry,
  BinaryFileEntryWithTimestamp,
  LocalAsset_Firmware,
  LocalAsset_Metadata,
  LocalAsset_Readme,
  LocalAsset_Thumbnail,
  TextFileEntry,
} from "web-firmix/app/base/types_local_project.ts";
import {
  FirmwareContainer,
  ImageFileContainer,
} from "web-firmix/app/base/types_project_edit.ts";
import { ProjectMetadataFirmwareSpec } from "web-firmix/app/base/types_project_metadata.ts";
import { firmixCore_projectLoader } from "web-firmix/app/cardinal/firmix_core_project_loader/mod.ts";
import { convertFirmwareBytesToUF2 } from "web-firmix/app/cardinal/firmix_presenter_common_modules/firmware_converter.ts";
import { imageFileLoader } from "web-firmix/app/cardinal/firmix_presenter_common_modules/image_file_loader.ts";

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
    metadataFile: TextFileEntry | undefined,
    boardFile: TextFileEntry | undefined
  ): LocalAsset_Metadata {
    if (!metadataFile) {
      return {
        validity: "error",
        filePath: "firmix.project.json",
        fileContent: undefined,
        boardFileContent: undefined,
        metadataInput: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    const { metadataInput, errorLines } =
      firmixCore_projectLoader.loadProjectMetadataFile_json(
        metadataFile.contentText,
        boardFile?.contentText ?? ""
      );
    const validity = errorLines.length === 0 ? "valid" : "error";
    return {
      validity,
      filePath: metadataFile.filePath,
      fileContent: metadataFile.contentText,
      boardFileContent: boardFile?.contentText ?? "",
      metadataInput: validity === "valid" ? metadataInput : undefined,
      errorLines,
    };
  },
  async buildAssetThumbnail(
    thumbnailFile: BinaryFileEntry | undefined
  ): Promise<LocalAsset_Thumbnail> {
    if (!thumbnailFile) {
      return {
        validity: "error",
        filePath: "thumbnail.(jpg|png)",
        thumbnailContainer: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    let thumbnailContainer: ImageFileContainer;

    try {
      thumbnailContainer = await imageFileLoader.loadBinaryImageFile(
        thumbnailFile
      );
    } catch (error: any) {
      console.error(error);
      return {
        validity: "error",
        filePath: thumbnailFile.filePath,
        thumbnailContainer: undefined,
        errorLines: [
          `画像を読み込めません。`,
          `詳細:${error.message ?? "unknown error"}`,
        ],
      };
    }

    const errorLines: string[] = [];
    const thumbnailValidationRes =
      firmixCore_projectLoader.validateOnlineThumbnailOnFrontend(
        thumbnailContainer
      );
    errorLines.push(...thumbnailValidationRes);

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
    firmwareFile: BinaryFileEntryWithTimestamp | undefined,
    firmwareFileLoadingErrorText: string | undefined,
    firmwareSpec: ProjectMetadataFirmwareSpec | undefined
  ): LocalAsset_Firmware {
    const makeErrorResult = (errorLines: string[]) => {
      return {
        validity: "error" as const,
        filePath: firmwareSpec?.path ?? "unknown file path",
        firmwareContainer: undefined,
        errorLines,
        lastModified: 0,
      };
    };

    if (!firmwareSpec) {
      return makeErrorResult(["メタデータにfirmwareSpecの定義がありません。"]);
    }

    if (firmwareFileLoadingErrorText) {
      return makeErrorResult([firmwareFileLoadingErrorText]);
    }

    if (!firmwareFile) {
      return makeErrorResult([
        "ファームウェアがありません。プロジェクトをビルドしてください。",
      ]);
    }

    const errorLines: string[] = [];
    let uf2BinaryBytes: Uint8Array;
    try {
      const res = convertFirmwareBytesToUF2(
        firmwareFile.contentBytes,
        firmwareSpec
      );
      uf2BinaryBytes = res.bytes;
      if (res.op === "converted") {
        errorLines.push(
          `UF2に変換しました (family:${res.family}, base:${res.base})`
        );
      }
    } catch (error) {
      console.error(error);
      return makeErrorResult([
        "ファームウェアの変換に失敗しました。",
        error.message,
      ]);
    }

    const firmwareContainer: FirmwareContainer = {
      kind: "uf2",
      fileName: filePathHelper.replaceExtension(
        filePathHelper.getFileNameFromFilePath(firmwareFile.filePath),
        "uf2"
      ),
      binaryBytes_base64: encodeBinaryBase64(uf2BinaryBytes),
    };
    return {
      validity: "valid",
      filePath: firmwareFile.filePath,
      firmwareContainer,
      errorLines,
      lastModified: firmwareFile.lastModified,
    };
  },
};
