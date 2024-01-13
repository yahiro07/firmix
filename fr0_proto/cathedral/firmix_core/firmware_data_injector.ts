import { firmwareBinaryModifier_patchUf2FileContent } from "~/aux/firmware_manipulation_helper/firmware_binary_modifier_uf2.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { CustomDataItem } from "~/base/entity_types.ts";
import { FirmwarePatchingBlob } from "~/base/internal_dto_types.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import { PatchingManifest } from "~/cathedral/firmix_core/types.ts";

export const firmwareDataInjector = {
  patchFirmwareBinary(
    originalFirmwareBytes: Uint8Array,
    patchingManifest: PatchingManifest,
    editItems: ConfigurationEditItem[],
  ): Uint8Array {
    const patchingBlob = local.buildPatchingBlob(patchingManifest, editItems);
    return firmwareBinaryModifier_patchUf2FileContent(
      originalFirmwareBytes,
      (firmwareBytes) =>
        local.applyFirmwarePatching(firmwareBytes, patchingBlob),
    );
  },
};

const local = {
  applyFirmwarePatching(
    firmwareBytes: Uint8Array,
    patchingBlob: FirmwarePatchingBlob,
  ) {
    const firmwareText = new TextDecoder("ascii").decode(firmwareBytes);
    for (const patchingEntry of patchingBlob.entries) {
      const { marker, dataBytes } = patchingEntry;
      const pos = firmwareText.indexOf(marker);
      const lastPos = firmwareText.lastIndexOf(marker);
      if (lastPos !== pos) {
        raiseError(`more than two markers found in firmware binary: ${marker}`);
      }
      const offset = pos + marker.length + 1;
      for (let i = 0; i < dataBytes.length; i++) {
        firmwareBytes[offset + i] = dataBytes[i];
      }
    }
  },
  serializeEditData(
    customDataItem: CustomDataItem,
    values: string[],
  ): number[] {
    const { key, dataKind } = customDataItem;
    if (dataKind === "pin") {
      const { dataCount } = customDataItem;
      if (values.length !== dataCount) {
        raiseError(`invalid pin count for ${key}`);
      }
      const pinNumbers = values.map((pinName) => {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return pinNumbers;
    } else if (dataKind === "vl_pins") {
      const { maxPinCount } = customDataItem;
      if (values.length > maxPinCount) {
        raiseError(`too many pins for ${key}`);
      }
      const pinNumbers = values.map((pinName) => {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return [pinNumbers.length, ...pinNumbers];
    } else {
      raiseError(`unsupported data kind ${dataKind}`);
    }
  },
  buildPatchingBlob(
    patchingManifest: PatchingManifest,
    editItems: ConfigurationEditItem[],
  ): FirmwarePatchingBlob {
    const entries: FirmwarePatchingBlob["entries"] = patchingManifest
      .dataEntries.map(
        (dataEntry) => {
          const dataBytes = dataEntry.items.map((customDataItem) => {
            const editItem = editItems.find((it) =>
              it.key === customDataItem.key
            );
            if (!editItem) {
              raiseError(`edit item not found for ${customDataItem.key}`);
            }
            return local.serializeEditData(customDataItem, editItem.values);
          }).flat();
          return { marker: dataEntry.marker, dataBytes };
        },
      );
    return { entries };
  },
};
