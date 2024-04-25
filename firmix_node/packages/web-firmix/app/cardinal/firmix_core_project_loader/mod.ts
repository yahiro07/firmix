import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { pickObjectMembers } from "@mx/auxiliaries/utils/utils_general";
import { appConfig } from "../../base/app_config";
import { ImageAssetAttrs } from "../../base/types_app_common";
import {
  ProjectBoardJsonFileContent,
  ProjectMetadataInput,
  ProjectMetadataJsonFileContent,
} from "../../base/types_project_metadata";
import { validateSchemaMetadataFileContent } from "../firmix_core_firmware_patching/matada_input_validator";

export const firmixCore_projectLoader = {
  loadProjectMetadataFile_json(
    fileContentText: string,
    boardFileContentText: string
  ): {
    metadataInput: ProjectMetadataInput;
    errorLines: string[];
  } {
    const fileContentJson = JSON.parse(
      fileContentText
    ) as ProjectMetadataJsonFileContent;

    const boardFileContentJson =
      (boardFileContentText &&
        (JSON.parse(boardFileContentText) as ProjectBoardJsonFileContent)) ||
      undefined;

    const errorLines = validateSchemaMetadataFileContent(fileContentJson);

    const metadataInput: ProjectMetadataInput = {
      ...pickObjectMembers(fileContentJson, [
        "projectGuid",
        "projectName",
        "targetMcu",
        "primaryTargetBoard",
        "tags",
        "repositoryUrl",
        "firmwareSpec",
      ]),
      parentProjectGuid: fileContentJson.parentProjectGuid ?? "",
      variationName: fileContentJson.variationName ?? "",
      introduction: fileContentJson.introductionLines.join("\n"),
      pinNumbersMap: boardFileContentJson?.pinNumbersMap ?? {},
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
