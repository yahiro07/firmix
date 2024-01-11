import { raiseError } from "~/aux/utils/error_util.ts";
import { firmixCore } from "~/cathedral/firmix_core/mod.ts";
import { FirmwareContainer } from "~/cathedral/firmix_core/types.ts";
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
      fileName: inputResources.firmwareFile.filePath,
      binaryBytes: inputResources.firmwareFile.contentBytes,
    };
    return { firmwareContainer, patchingManifest };
  },
};
