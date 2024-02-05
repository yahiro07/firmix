import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { pickObjectMembers } from "~/auxiliaries/utils/utils_general.ts";
import { appConfig } from "~/base/app_config.ts";
import { ImageAssetAttrs } from "~/base/types_app_common.ts";
import {
  ProjectMetadataInput,
  ProjectMetadataJsonFileContent,
} from "~/base/types_project_metadata.ts";
import { validateSchemaMetadataFileContent } from "~/cardinal/firmix_core_firmware_patching/matada_input_validator.ts";

export const firmixCore_projectLoader = {
  loadProjectMetadataFile_json(fileContentText: string): {
    metadataInput: ProjectMetadataInput;
    errorLines: string[];
  } {
    const fileContentJson = JSON.parse(
      fileContentText
    ) as ProjectMetadataJsonFileContent;

    const errorLines = validateSchemaMetadataFileContent(fileContentJson);

    const metadataInput = {
      ...pickObjectMembers(fileContentJson, [
        "projectGuid",
        "projectName",
        "thumbnailUrl",
        "targetMcu",
        "primaryTargetBoard",
        "tags",
        "repositoryUrl",
        "dataEntries",
        "editUiItems",
      ]),
      introduction: fileContentJson.introductionLines.join("\n"),
    };

    return { metadataInput, errorLines };
  },
  validateOnlineThumbnailOnServer(imageAttrs: ImageAssetAttrs) {
    const { fileSize, width, height } = imageAttrs;
    const {
      thumbnail_maxFileSize: maxFileSize,
      thumbnail_maxWidth: maxWidth,
      thumbnail_maxHeight: maxHeight,
    } = appConfig;
    if (fileSize >= maxFileSize) {
      const kbMax = (maxFileSize / 1000) >> 0;
      const kbActual = (fileSize / 1000) >> 0;
      raiseError(
        `thumbnail image file size too large, expected: max ${kbMax}kB, actual ${kbActual}kB`
      );
    }
    if (!(width <= maxWidth && height <= maxHeight)) {
      raiseError(
        `thumbnail image size too large, expected: max ${maxWidth}x${maxHeight}, actual:${width}x${height}, `
      );
    }
  },
  validateOnlineThumbnailOnFrontend(imageAttrs: ImageAssetAttrs): string[] {
    const { fileSize, width, height } = imageAttrs;
    const {
      thumbnail_maxFileSize: maxFileSize,
      thumbnail_maxWidth: maxWidth,
      thumbnail_maxHeight: maxHeight,
    } = appConfig;

    const errorLines: string[] = [];
    if (fileSize >= maxFileSize) {
      const kbMax = (maxFileSize / 1000) >> 0;
      const kbActual = (fileSize / 1000) >> 0;
      errorLines.push(
        `画像のファイルサイズを${kbMax}kB以下にしてください。(現在のサイズ:${kbActual}kB`
      );
    }
    if (!(width <= maxWidth && height <= maxHeight)) {
      errorLines.push(
        `画像の縦横のサイズを${maxWidth}x${maxHeight}以下にしてください。(現在のサイズ:${width}x${height})`
      );
    }
    return errorLines;
  },
};
