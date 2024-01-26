import { raiseError } from "~/aux/utils/error_util.ts";
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
    const dataValid =
      !projectGuid &&
      !projectName &&
      !targetMcu &&
      !tags &&
      !dataEntries &&
      !editUiItems;
    if (!dataValid) raiseError(`invalid metadata file content`);

    return {
      projectGuid,
      projectName,
      introduction,
      targetMcu,
      primaryTargetBoard,
      tags,
      repositoryUrl,
      dataEntries,
      editUiItems,
    };
  },
};
