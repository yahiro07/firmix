import { produce } from "immer";
import { raiseError } from "~/aux/utils/error_util.ts";
import { decodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import {
  BinaryFileEntry,
  LocalDevelopmentProject,
} from "~/base/types_local_project.ts";
import {
  ConfigurationEditItem,
  FirmwareContainer,
  PatchingDataBlob,
} from "~/base/types_project_edit.ts";
import { firmixCore_firmwarePatching } from "~/cardinal/firmix_core_firmware_patching/mod.ts";
import { createLocalDirectoryReader } from "~/cardinal/firmix_presenter_common_modules/local_directory_reader.ts";
import { localAssetBuilder } from "~/cardinal/firmix_presenter_local_project_edit/local_asset_builder.ts";

type FirmixPresenter_LocalProjectEdit = {
  loadLocalDevelopmentProject(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<LocalDevelopmentProject>;
  patchLocalProjectFirmware(
    project: LocalDevelopmentProject,
    editItems: ConfigurationEditItem[]
  ): FirmwareContainer;
  projectEmitModifiedFirmware(
    project: LocalDevelopmentProject,
    modFirmware: FirmwareContainer
  ): Promise<LocalDevelopmentProject>;
};

export const firmixPresenter_localProjectEdit: FirmixPresenter_LocalProjectEdit =
  {
    async loadLocalDevelopmentProject(dirHandle) {
      const dirReader = createLocalDirectoryReader(dirHandle);
      const metadataFile = await dirReader.readTextFile(`project.fm1.json`);
      const thumbnailFile = await dirReader.readBinaryFile(`thumbnail.jpg`);
      const readmeFile = await dirReader.readTextFile("readme.md");

      let firmwareFile: BinaryFileEntry | undefined;
      let firmwareFileLoadingErrorText: string | undefined;
      let firmwareDirectoryHandle: FileSystemDirectoryHandle | undefined;
      try {
        const boardFolderName = await dirReader.getSingleSubDirectoryNameUnder(
          `.pio/build`
        );
        firmwareDirectoryHandle = await dirReader.getSubDirectoryHandle(
          `.pio/build/${boardFolderName}`
        );
        firmwareFile = await dirReader.readBinaryFile(
          `.pio/build/${boardFolderName}/firmware.uf2`
        );
      } catch (_error) {
        // firmwareFileLoadingErrorText = error.message ?? error;
      }

      const assetReadme = localAssetBuilder.buildAssetReadme(readmeFile);
      const assetMetadata = localAssetBuilder.buildAssetMetadata(metadataFile);
      const assetThumbnail = await localAssetBuilder.buildAssetThumbnail(
        thumbnailFile
      );
      const assetFirmware = localAssetBuilder.buildAssetFirmware(
        firmwareFile,
        firmwareFileLoadingErrorText
      );
      return {
        projectRootDirectoryHandle: dirHandle,
        firmwareDirectoryHandle,
        assetReadme,
        assetMetadata,
        assetThumbnail,
        assetFirmware,
      };
    },
    patchLocalProjectFirmware(project, editItems) {
      const {
        assetFirmware: { firmwareContainer },
        assetMetadata: { metadataInput },
      } = project;
      if (!(firmwareContainer && metadataInput))
        raiseError(`invalid condition`);
      const patchingDataBlob: PatchingDataBlob = { editItems };
      return firmixCore_firmwarePatching.fabricateFirmware(
        firmwareContainer,
        metadataInput,
        patchingDataBlob
      );
    },

    async projectEmitModifiedFirmware(project, modFirmware) {
      const { firmwareDirectoryHandle, assetFirmware } = project;
      if (!(assetFirmware.firmwareContainer && firmwareDirectoryHandle))
        raiseError(`invalid condition`);
      const srcFirmwareFilePath = assetFirmware.filePath;
      const srcFirmwareFileName = assetFirmware.firmwareContainer.fileName;
      const modFirmwareFileName = modFirmware.fileName;
      const modFirmwareFilePath = srcFirmwareFilePath.replace(
        srcFirmwareFileName,
        modFirmwareFileName
      );
      const fileHandle = await firmwareDirectoryHandle.getFileHandle(
        modFirmwareFileName,
        { create: true }
      );
      const writable = await fileHandle.createWritable();
      const binaryBites = decodeBinaryBase64(modFirmware.binaryBytes_base64);
      await writable.write(binaryBites);
      await writable.close();

      return produce(project, (draft) => {
        draft.modFirmwareFilePath = modFirmwareFilePath;
      });
    },
  };
