import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { filePathHelper } from "@mx/auxiliaries/utils/file_path_helper";
import {
  numberToHexString,
  parseIntCheckedZeroOrPositiveInteger,
} from "@mx/auxiliaries/utils/utils_number";
import {
  convertBinToUf2,
  convertHexToBin,
  getUf2FamilyId,
  readHexBaseAddress,
} from "uf2gen";
import { ProjectMetadataFirmwareSpec } from "web-kfx/app/base/types_project_metadata";

export function convertFirmwareBytesToUF2(
  firmwareFileBytes: Uint8Array,
  firmwareSpec: ProjectMetadataFirmwareSpec
):
  | { op: "passThrough"; bytes: Uint8Array }
  | { op: "converted"; bytes: Uint8Array; base: string; family: string } {
  const ext = filePathHelper.getExtension(firmwareSpec.path);
  if (ext === "uf2") {
    return { op: "passThrough", bytes: firmwareFileBytes };
  } else if (ext === "bin" || ext === "hex") {
    if (!firmwareSpec.uf2gen_options) {
      raiseError(`missing firmwareSpec.uf2gen_options`);
    }
    const familySpecText = firmwareSpec.uf2gen_options.family;
    const familyId = getUf2FamilyId(familySpecText);
    if (!familyId) {
      raiseError(`missing target family: ${familySpecText}`);
    }

    if (ext === "bin") {
      const baseAddressText = firmwareSpec.uf2gen_options?.base;
      if (!baseAddressText) {
        raiseError(`missing firmwareSpec.uf2gen_options.base`);
      }
      const baseAddress = parseIntCheckedZeroOrPositiveInteger(
        baseAddressText,
        16
      );
      const bytes = convertBinToUf2(firmwareFileBytes, baseAddress, familyId);

      return {
        op: "converted",
        bytes,
        base: numberToHexString(baseAddress),
        family: familySpecText,
      };
    } else {
      const hexFileText = new TextDecoder().decode(firmwareFileBytes);
      const binBinaryBytes = convertHexToBin(hexFileText);
      const baseAddress = readHexBaseAddress(hexFileText);
      const bytes = convertBinToUf2(binBinaryBytes, baseAddress, familyId);

      return {
        op: "converted",
        bytes,
        base: numberToHexString(baseAddress),
        family: familySpecText,
      };
    }
  } else {
    raiseError(`unsupported firmware type`);
  }
}
