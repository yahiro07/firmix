import { raiseError } from "~/aux/utils/error_util.ts";
import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { CustomDataItem, ProjectEntity } from "~/base/entity_types.ts";
import { FirmwarePatchingBlob } from "~/base/internal_dto_types.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";

export const firmwareDataInjector = {
  patchFirmwareBinary(
    originalFirmwareBytes: Uint8Array,
    project: ProjectEntity,
    editItems: ConfigurationEditItem[],
  ): Uint8Array {
    const patchingBlob = local.buildPatchingBlob(project, editItems);
    return local.applyFirmwarePatching(originalFirmwareBytes, patchingBlob);
  },
};

const local = {
  applyFirmwarePatching(
    originalFirmwareBytes: Uint8Array,
    patchingBlob: FirmwarePatchingBlob,
  ): Uint8Array {
    const firmwareBytes = originalFirmwareBytes.slice();
    const firmwareText = new TextDecoder("ascii").decode(firmwareBytes);
    console.log({
      len0: originalFirmwareBytes.byteLength,
      len1: firmwareText.length,
    });
    for (const patchingEntry of patchingBlob.entries) {
      const { marker, dataBytes } = patchingEntry;
      const pos = firmwareText.indexOf(marker);
      const lastPos = firmwareText.lastIndexOf(marker);
      if (lastPos !== pos) {
        raiseError(`more than two markers found in firmware binary: ${marker}`);
      }
      const offset = pos + marker.length + 1;
      console.log({ pos, offset });
      for (let i = 0; i < dataBytes.length; i++) {
        firmwareBytes[offset + i] = dataBytes[i];
      }
    }
    return firmwareBytes;
  },
  serializeEditData(
    customDataItem: CustomDataItem,
    values: string[],
  ): number[] {
    const { key, dataKind, dataCount } = customDataItem;
    if (values.length !== dataCount) {
      raiseError(`invalid data count for ${key}`);
    }
    if (dataKind === "pin") {
      const pinNumbers = values.map((pinName) => {
        const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
        if (pinNumber === undefined) {
          raiseError(`invalid pin name ${pinName}`);
        }
        return pinNumber;
      });
      return pinNumbers;
    } else {
      raiseError(`unsupported data kind ${dataKind}`);
    }
  },
  buildPatchingBlob(
    project: ProjectEntity,
    editItems: ConfigurationEditItem[],
  ): FirmwarePatchingBlob {
    const entries: FirmwarePatchingBlob["entries"] = project.dataEntries.map(
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
