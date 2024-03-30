import { z } from "zod";
import { formatZodErrorToLines } from "~/auxiliaries/utils/zod_helper.ts";
import { ProjectBoardJsonFileContent } from "~/base/types_project_metadata.ts";

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
