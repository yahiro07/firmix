import { ProjectMetadataJsonFileContent } from "~/base/internal_dto_types.ts";
import {
  FirmixCore,
  FirmwareContainer,
  PatchingDataBlob,
  PatchingManifest,
  ProjectMetadataInput,
} from "~/cathedral/firmix_core/types.ts";

export const firmixCore: FirmixCore = {
  loadProjectMetadataFile_json(
    fileContentText: string,
  ): ProjectMetadataInput {
    const metadata = JSON.parse(
      fileContentText,
    ) as ProjectMetadataJsonFileContent;
    const { targetMcu, dataEntries, editUiItems } = metadata;
    return { patchingManifest: { targetMcu, dataEntries, editUiItems } };
  },
  checkPatchingManifestValidity(_manifest: PatchingManifest): string {
    return "";
  },
  checkPatchingDataBlobValidity(
    manifest: PatchingManifest,
    blob: PatchingDataBlob,
  ): string {
    throw new Error("Function not implemented.");
  },
  fabricateFirmware(
    firmware: FirmwareContainer,
    manifest: PatchingManifest,
    blob: PatchingDataBlob,
  ): FirmwareContainer {
    throw new Error("Function not implemented.");
  },
};
