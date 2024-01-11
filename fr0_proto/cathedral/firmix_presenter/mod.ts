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
    const { patchingManifest } = firmixCore.loadProjectMetadataFile_json(
      inputResources.metadataFile.contentText,
    );
    const validationResult = firmixCore.checkPatchingManifestValidity(
      patchingManifest,
    );
    if (validationResult) raiseError(validationResult);
    const firmwareContainer: FirmwareContainer = {
      kind: "uf2",
      fileName: filePathHelper.getFileNameFromFilePath(
        inputResources.firmwareFile.filePath,
      ),
      binaryBytes: inputResources.firmwareFile.contentBytes,
    };
    return {
      firmwareContainer,
      patchingManifest,
      assetFilePaths: {
        firmware: inputResources.firmwareFile.filePath,
        metadata: inputResources.metadataFile.filePath,
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
      const { dataKind, dataCount } = dataItem;
      return {
        key,
        dataKind,
        dataCount,
        label,
        instruction,
      };
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
