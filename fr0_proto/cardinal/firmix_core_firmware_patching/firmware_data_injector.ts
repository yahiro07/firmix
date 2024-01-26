import { firmwareBinaryModifier_patchUf2FileContent } from "~/aux/firmware_manipulation_helper/firmware_binary_modifier_uf2.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { padZeros } from "~/aux/utils/utils_array.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import { CustomDataItem } from "~/base/types_core_entity.ts";
import {
  ConfigurationEditItem,
  FirmwarePatchingBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";

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
    textValues: string[],
  ): number[] {
    const { key, dataKind } = customDataItem;
    if (dataKind === "u8" || dataKind === "i8") {
      const { dataCount } = customDataItem;
      if (textValues.length !== dataCount) {
        raiseError(`invalid data count for ${key}`);
      }
      const byteValues = textValues.map((text) => {
        const value = parseInt(text);
        if (!isFinite(value)) {
          raiseError(`invalid value ${value}`);
        }
        if (dataKind === "u8" && !(0 <= value && value <= 255)) {
          raiseError(`invalid value ${value}, it must be in range 0~255`);
        }
        if (dataKind === "i8" && !(-128 <= value && value <= 127)) {
          raiseError(`invalid value ${value}, it must be in range -128~127`);
        }
        return value < 0 ? (128 + value) : value;
      });
      return byteValues;
    } else if (dataKind === "pins") {
      const { pinCount } = customDataItem;
      if (textValues.length !== pinCount) {
        raiseError(`invalid pin count for ${key}`);
      }
      const pinNumbers = textValues.map((pinName) => {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return pinNumbers;
    } else if (dataKind === "vl_pins") {
      const { pinsCapacity } = customDataItem;
      if (textValues.length > pinsCapacity) {
        raiseError(`too many pins for ${key}`);
      }
      const pinNumbers = textValues.map((pinName) => {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return [pinNumbers.length, ...padZeros(pinNumbers, pinsCapacity)];
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
          console.log({ dataBytes });
          return { marker: dataEntry.marker, dataBytes };
        },
      );
    return { entries };
  },
};
