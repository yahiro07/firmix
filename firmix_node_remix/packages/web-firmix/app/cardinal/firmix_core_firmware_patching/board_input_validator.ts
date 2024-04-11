import { formatZodErrorToLines } from "auxiliaries/utils/zod_helper.ts";
import { ProjectBoardJsonFileContent } from "web-firmix/app/base/types_project_metadata.ts";
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
