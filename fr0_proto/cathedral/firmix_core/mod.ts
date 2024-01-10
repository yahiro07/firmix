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
    throw new Error("Function not implemented.");
  },
  checkPatchingManifestValidity(manifest: PatchingManifest): string {
    throw new Error("Function not implemented.");
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
