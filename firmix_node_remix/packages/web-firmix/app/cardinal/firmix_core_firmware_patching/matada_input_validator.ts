import { formatZodErrorToLines } from "auxiliaries/utils/zod_helper";
import { ProjectMetadataJsonFileContent } from "web-firmix/app/base/types_project_metadata";
import { z } from "zod";

const customDataItemCommon = {
  key: z.string().max(32),
  required: z.boolean().optional(),
};

const stringLiterals = (literals: string[]) =>
  z.union(literals.map((lit) => z.literal(lit)) as any);

const schemaMetadataFileContent = z.object({
  projectGuid: z.string().uuid(),
  projectName: z.string().max(32),
  parentProjectGuid: z.string().uuid().optional(),
  variationName: z.string().max(32).optional(),
  introductionLines: z.array(z.string().max(256)),
  targetMcu: stringLiterals([
    "RP2040",
    "SAMD21",
    "SAMD51",
    "nRF52840",
    "ESP32S3",
  ]),
  primaryTargetBoard: z.string().max(32),
  tags: z.array(z.string().max(32)),
  repositoryUrl: z.string().max(256),
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
  firmwareSpec: z.object({
    path: z.string(),
    uf2gen_options: z
      .object({
        family: z.string(),
        base: z.string().optional(),
      })
      .optional(),
  }),
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
  checkJsonSchemaExtra(
    fileContentJson: ProjectMetadataJsonFileContent
  ): string[] {
    const errorLines = [];

    const membersProhibited = ["realm", "dataEntries", "editUiItems"];
    for (const key of membersProhibited) {
      if (key in fileContentJson) {
        errorLines.push(`property ${key} is not supported on this version`);
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
    return local.checkJsonSchemaExtra(fileContentJson);
  }
}
