import { raiseError } from "~/aux/utils/error_util.ts";
import { filePathHelper } from "~/aux/utils/file_path_helper.ts";
import { firmixCore } from "~/cathedral/firmix_core/mod.ts";
import {
  FirmwareContainer,
  PatchingDataBlob,
} from "~/cathedral/firmix_core/types.ts";
import {
  FirmixPresenter,
  LocalDevelopmentProject,
} from "~/cathedral/firmix_presenter/types.ts";

export const firmixPresenter: FirmixPresenter = {
  buildLocalDevelopmentProject(inputResources): LocalDevelopmentProject {
    const {
      metadataFile,
      firmwareFile,
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
    } = inputResources;
    const { patchingManifest } = firmixCore.loadProjectMetadataFile_json(
      metadataFile.contentText,
    );
    const validationResult = firmixCore.checkPatchingManifestValidity(
      patchingManifest,
    );
    if (validationResult) raiseError(validationResult);
    const firmwareContainer: FirmwareContainer = {
      kind: "uf2",
      fileName: filePathHelper.getFileNameFromFilePath(firmwareFile.filePath),
      binaryBytes: firmwareFile.contentBytes,
    };
    return {
      projectRootDirectoryHandle,
      firmwareDirectoryHandle,
      firmwareContainer,
      patchingManifest,
      assetFilePaths: {
        firmware: firmwareFile.filePath,
        metadata: metadataFile.filePath,
      },
    };
  },
  buildConfigurationSourceItems(patchingManifest) {
    const dataItems = patchingManifest.dataEntries.map((it) => it.items).flat();
    return patchingManifest.editUiItems.map((editUiItem) => {
      const { key, label, instruction } = editUiItem;
      const dataItem = dataItems.find((it) => it.key === key);
      if (!dataItem) {
        return { key, dataKind: "error" };
      }
      const { dataKind } = dataItem;
      if (dataKind === "pin") {
        const { dataCount } = dataItem;
        return {
          key,
          dataKind,
          dataCount,
          label,
          instruction,
        };
      } else if (dataKind === "vl_pins") {
        const { maxPinCount } = dataItem;
        return {
          key,
          dataKind,
          maxPinCount,
          label,
          instruction,
        };
      } else {
        raiseError(`unsupported data kind ${dataKind}`);
      }
    });
  },
  patchLocalProjectFirmware(project, editItems) {
    const { firmwareContainer, patchingManifest } = project;
    const patchingDataBlob: PatchingDataBlob = { editItems };
    return firmixCore.fabricateFirmware(
      firmwareContainer,
      patchingManifest,
      patchingDataBlob,
    );
  },
};
