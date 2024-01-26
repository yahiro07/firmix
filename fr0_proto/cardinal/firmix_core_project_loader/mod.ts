import { raiseError } from "~/aux/utils/error_util.ts";
import { appConfig } from "~/base/app_config.ts";
import { ImageAssetAttrs } from "~/base/types_app_common.ts";
import {
  ProjectMetadataInput,
  ProjectMetadataJsonFileContent,
} from "~/base/types_project_metadata.ts";

export const firmixCore_projectLoader = {
  loadProjectMetadataFile_json(fileContentText: string): ProjectMetadataInput {
    const metadata = JSON.parse(
      fileContentText
    ) as ProjectMetadataJsonFileContent;
    const {
      projectGuid,
      projectName,
      thumbnailUrl,
      introductionLines,
      targetMcu,
      primaryTargetBoard,
      repositoryUrl,
      tags,
      dataEntries,
      editUiItems: editUiItemsInput,
    } = metadata;
    const introduction = introductionLines.join("\n");
    const editUiItems = editUiItemsInput.map((it) => ({
      ...it,
      instruction: it.instruction ?? it.instructionLines?.join("\n") ?? "",
    }));

    //TODO: 各フィールドの内容も含めてスキーマをチェックする
    const dataValid = !!(
      projectGuid &&
      projectName &&
      thumbnailUrl &&
      targetMcu &&
      tags &&
      dataEntries &&
      editUiItems
    );
    if (!dataValid) raiseError(`invalid metadata file content`);

    return {
      projectGuid,
      projectName,
      thumbnailUrl,
      introduction,
      targetMcu,
      primaryTargetBoard,
      tags,
      repositoryUrl,
      dataEntries,
      editUiItems,
    };
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
