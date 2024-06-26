import { formatZodErrorToLines } from "@mx/auxiliaries/utils/zod_helper";
import { ProjectBoardJsonFileContent } from "@mx/web-kfx/app/base/types_project_metadata";
import { z } from "zod";

const schemaProjectBoardFileContent = z.object({
  pinNumbersMap: z.record(z.number()),
});

const local = {
  checkJsonSchema(fileContentJson: ProjectBoardJsonFileContent): string[] {
    try {
      schemaProjectBoardFileContent.parse(fileContentJson);
    } catch (error) {
      return formatZodErrorToLines(error);
    }
    return [];
  },
};

export function validateSchemaProjectBoardFileContent(
  fileContentJson: ProjectBoardJsonFileContent
): string[] {
  return local.checkJsonSchema(fileContentJson);
}
