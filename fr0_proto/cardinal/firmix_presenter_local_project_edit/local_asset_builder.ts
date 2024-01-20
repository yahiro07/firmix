import { filePathHelper } from "~/aux/utils/file_path_helper.ts";
import { encodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import {
  BinaryFileEntry,
  LocalAsset_Firmware,
  LocalAsset_Metadata,
  LocalAsset_Readme,
  LocalAsset_Thumbnail,
  TextFileEntry,
} from "~/base/types_local_project.ts";
import { FirmwareContainer } from "~/base/types_project_edit.ts";
import {
  ProjectMetadataInput,
  ProjectMetadataJsonFileContent,
} from "~/base/types_project_metadata.ts";
import { firmixCore_firmwarePatching } from "~/cardinal/firmix_core_firmware_patching/mod.ts";
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
        metadataInput: undefined,
        errorLines: ["ファイルがありません。"],
      };
    }
    const metadataInput = local.loadProjectMetadataFile_json(
      metadataFile.contentText
    );

    // const patchingManifest = pickObjectMembers(metadataInput, [
    //   "targetMcu",
    //   "dataEntries",
    //   "editUiItems",
    // ]);
    const validationResult =
      firmixCore_firmwarePatching.validateMetadataInput(metadataInput);

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

const local = {
  loadProjectMetadataFile_json(fileContentText: string): ProjectMetadataInput {
    const metadata = JSON.parse(
      fileContentText
    ) as ProjectMetadataJsonFileContent;
    const {
      projectGuid,
      projectName,
      introductionLines,
      targetMcu,
      primaryTargetBoard,
      sourceCodeUrl,
      tags,
      dataEntries,
      editUiItems: editUiItemsInput,
    } = metadata;
    const introduction = introductionLines.join("\n");
    const editUiItems = editUiItemsInput.map((it) => ({
      ...it,
      instruction: it.instruction ?? it.instructionLines?.join("\n") ?? "",
    }));
    return {
      projectGuid,
      projectName,
      introduction,
      targetMcu,
      primaryTargetBoard,
      tags,
      sourceCodeUrl,
      dataEntries,
      editUiItems,
    };
  },
};
