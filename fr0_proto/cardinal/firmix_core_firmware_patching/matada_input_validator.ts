import { z } from "zod";
import { formatZodErrorToLines } from "~/auxiliaries/utils/zod_helper.ts";
import { ProjectMetadataJsonFileContent } from "~/base/types_project_metadata.ts";

const customDataItemCommon = {
  key: z.string().max(32),
  required: z.boolean().optional(),
};

const schemaMetadataFileContent = z.object({
  projectGuid: z.string().uuid(),
  projectName: z.string().max(32),
  thumbnailUrl: z.string().max(256),
  introductionLines: z.array(z.string().max(256)),
  targetMcu: z.literal("RP2040"),
  primaryTargetBoard: z.string().max(32),
  repositoryUrl: z.string().max(256),
  tags: z.array(z.string().max(32)),
  dataEntries: z
    .array(
      z.object({
        marker: z.string().max(32),
        items: z.array(
          z.discriminatedUnion("dataKind", [
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("u8"),
              dataCount: z.number().int().positive(),
              fallbackValues: z.array(z.number()).optional(),
            }),
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("i8"),
              dataCount: z.number().int().positive(),
              fallbackValues: z.array(z.number()).optional(),
            }),
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("pins"),
              pinsCount: z.number().int().positive(),
            }),
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("vl_pins"),
              pinsCapacity: z.number().int().positive(),
            }),
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("text"),
              textLength: z.number().int().positive(),
            }),
            z.object({
              ...customDataItemCommon,
              dataKind: z.literal("vl_text"),
              textCapacity: z.number().int().positive(),
            }),
          ])
        ),
      })
    )
    .optional(),
  editUiItems: z
    .array(
      z.object({
        key: z.string().max(32),
        label: z.string().max(32),
      })
    )
    .optional(),
});

const local = {
  checkJsonSchema(fileContentJson: ProjectMetadataJsonFileContent): string[] {
    try {
      schemaMetadataFileContent.parse(fileContentJson);
    } catch (error) {
      return formatZodErrorToLines(error);
    }
    return [];
  },
  checkMetadataConsistency(
    fileContentJson: ProjectMetadataJsonFileContent
  ): string[] {
    const errorLines = [];

    for (const dataEntry of fileContentJson.dataEntries) {
      for (const item of dataEntry.items) {
        if (item.dataKind === "u8" || item.dataKind === "i8") {
          if (
            item.fallbackValues &&
            item.fallbackValues.length !== item.dataCount
          ) {
            errorLines.push(
              `${dataEntry.marker} ${item.key}: invalid fallbackValues length`
            );
          }
        }
      }
    }
    const dataEntryFlatItems = fileContentJson.dataEntries.flatMap(
      (it) => it.items
    );
    for (const editUiItem of fileContentJson.editUiItems) {
      const targetDataEntry = dataEntryFlatItems.find(
        (it) => it.key === editUiItem.key
      );
      if (!targetDataEntry) {
        errorLines.push(`target data entry not found for ${editUiItem.key}`);
      }
    }
    return errorLines;
  },
};

export function validateSchemaMetadataFileContent(
  fileContentJson: ProjectMetadataJsonFileContent
): string[] {
  const errorLines = local.checkJsonSchema(fileContentJson);
  if (errorLines.length > 0) {
    return errorLines;
  } else {
    return local.checkMetadataConsistency(fileContentJson);
  }
}
