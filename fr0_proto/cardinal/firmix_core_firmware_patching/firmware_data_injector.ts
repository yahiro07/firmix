import { firmwareBinaryModifier_patchUf2FileContent } from "~/auxiliaries/firmware_manipulation_helper/firmware_binary_modifier_uf2.ts";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { sumArrayNumbers } from "~/auxiliaries/utils/utils_array.ts";
import {
  convertTextToBinaryBytes,
  stringifyBytesHex,
} from "~/auxiliaries/utils/utils_binary.ts";
import { generateRandomId } from "~/auxiliaries/utils_be/id_generator.ts";
import {
  ConfigurationEditItem,
  FirmwarePatchingBlob,
  PatchingManifest,
} from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";

export const firmwareDataInjector = {
  patchFirmwareBinary(
    originalFirmwareBytes: Uint8Array,
    patchingManifest: PatchingManifest,
    editItems: ConfigurationEditItem[]
  ): Uint8Array {
    const patchingBlob = local.buildPatchingBlob(patchingManifest, editItems);
    return firmwareBinaryModifier_patchUf2FileContent(
      originalFirmwareBytes,
      (firmwareBytes) =>
        local.applyFirmwarePatching(firmwareBytes, patchingBlob)
    );
  },
};

const local = {
  applyFirmwarePatching(
    firmwareBytes: Uint8Array,
    patchingBlob: FirmwarePatchingBlob
  ) {
    const firmwareText = new TextDecoder("ascii").decode(firmwareBytes);
    for (const patchingEntry of patchingBlob.entries) {
      const { marker, dataBytes, ensurePatched, markerNullTerminated } =
        patchingEntry;
      const pos = firmwareText.indexOf(marker);
      const lastPos = firmwareText.lastIndexOf(marker);
      if (lastPos !== pos) {
        raiseError(`more than two markers found in firmware binary: ${marker}`);
      }
      if (pos === -1) {
        if (ensurePatched) {
          raiseError(`marker not found ${marker}`);
        }
      } else {
        const offset = pos + marker.length + (markerNullTerminated ? 1 : 0);
        for (let i = 0; i < dataBytes.length; i++) {
          firmwareBytes[offset + i] = dataBytes[i];
        }
      }
    }
  },

  buildPatchingBlob(
    patchingManifest: PatchingManifest,
    editItems: ConfigurationEditItem[]
  ): FirmwarePatchingBlob {
    const entries: FirmwarePatchingBlob["entries"] =
      patchingManifest.dataEntries.map((dataEntry) => {
        const dataBlocks = dataEntry.items.map((customDataItem) => {
          const editItem = editItems.find(
            (it) => it.key === customDataItem.key
          );
          if (!editItem) {
            raiseError(`edit item not found for ${customDataItem.key}`);
          }
          const dataBytes = firmixCore_firmwareConfiguration.serializeEditData(
            customDataItem,
            editItem.values
          );
          return dataBytes.map((val) => (val === -1 ? 255 : val));
        });

        const { marker } = dataEntry;
        const markerBytes = convertTextToBinaryBytes(marker, true);

        console.log(`🔖marker ${marker}`);
        console.log(stringifyBytesHex(markerBytes), `(${markerBytes.length})`);
        const dataBytes = dataBlocks.flat();
        for (const block of dataBlocks) {
          console.log(stringifyBytesHex(block), `(${block.length})`);
        }
        console.log(`data length: ${dataBytes.length}`);

        const blockDataLengthExpected = sumArrayNumbers(
          dataEntry.items.map(
            firmixCore_firmwareConfiguration.getCustomDataItemFillingDataLength
          )
        );
        if (dataBytes.length !== blockDataLengthExpected) {
          raiseError(
            `invalid block length ${dataBytes.length}/${blockDataLengthExpected}`
          );
        }
        return {
          marker,
          dataBytes,
          ensurePatched: true,
          markerNullTerminated: true,
        };
      });
    if (1) {
      //Kermite FirmwareのdeviceInstanceCodeを注入
      const dataBytes = [
        ...convertTextToBinaryBytes("000000", true),
        ...convertTextToBinaryBytes("00", true),
        ...convertTextToBinaryBytes(generateRandomId(4), true),
      ];
      // console.log({ dataBytes });
      entries.push({
        marker: "$KMMD",
        dataBytes,
        ensurePatched: false,
        markerNullTerminated: false,
      });
    }
    return { entries };
  },
};
