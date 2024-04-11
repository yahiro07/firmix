import { decodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { raiseError } from "auxiliaries/utils/error_util.ts";
import { filePathHelper } from "auxiliaries/utils/file_path_helper.ts";
import { produce } from "immer";
import {
  BinaryFileEntryWithTimestamp,
  LocalDevelopmentProject,
} from "~/base/types_local_project.ts";
import {
  ConfigurationEditItem,
  FirmwareContainer,
  PatchingDataBlob,
} from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";
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
      const metadataFile = await dirReader.readTextFile("firmix.project.json");
      const boardFile = await dirReader.readTextFile("firmix.board.json");
      const readmeFile = await dirReader.readTextFile("readme.md");
      const thumbnailPngFile = await dirReader.readBinaryFile("thumbnail.png");
      const thumbnailJpgFile = await dirReader.readBinaryFile("thumbnail.jpg");
      const thumbnailJpegFile = await dirReader.readBinaryFile(
        "thumbnail.jpeg"
      );

      const assetMetadata = localAssetBuilder.buildAssetMetadata(
        metadataFile,
        boardFile
      );

      const firmwareSpec = assetMetadata.metadataInput?.firmwareSpec;
      let firmwareFile: BinaryFileEntryWithTimestamp | undefined;
      let firmwareFileLoadingErrorText: string | undefined;
      let firmwareDirectoryHandle: FileSystemDirectoryHandle | undefined;
      try {
        const firmwareFilePath = firmwareSpec?.path;
        if (firmwareFilePath) {
          firmwareFile = await dirReader.readBinaryFile(firmwareFilePath);
          const firmwareFolderPath =
            filePathHelper.getFolderPath(firmwareFilePath);
          firmwareDirectoryHandle = await dirReader.getSubDirectoryHandle(
            firmwareFolderPath
          );
        }
      } catch (error) {
        console.error(error);
        firmwareFileLoadingErrorText =
          error.message ?? `failed to load firmware file`;
      }

      const assetReadme = localAssetBuilder.buildAssetReadme(readmeFile);

      const assetThumbnail = await localAssetBuilder.buildAssetThumbnail(
        thumbnailPngFile ?? thumbnailJpgFile ?? thumbnailJpegFile
      );
      const assetFirmware = localAssetBuilder.buildAssetFirmware(
        firmwareFile,
        firmwareFileLoadingErrorText,
        firmwareSpec
      );

      const canSubmit =
        assetReadme.validity !== "error" &&
        assetMetadata.validity !== "error" &&
        assetFirmware.validity !== "error" &&
        assetThumbnail.validity !== "error";

      const configurationSourceItems =
        assetMetadata.metadataInput &&
        firmixCore_firmwareConfiguration.buildConfigurationSourceItems(
          assetMetadata.metadataInput
        );

      return {
        projectRootDirectoryHandle: dirHandle,
        firmwareDirectoryHandle,
        assetReadme,
        assetMetadata,
        assetThumbnail,
        assetFirmware,
        configurationSourceItems,
        canSubmit,
      };
    },
    patchLocalProjectFirmware(project, editItems) {
      const {
        assetFirmware: { firmwareContainer },
        assetMetadata: { metadataInput },
      } = project;
      if (!firmwareContainer || !metadataInput) raiseError(`invalid condition`);
      const patchingDataBlob: PatchingDataBlob = { editItems };
      return firmixCore_firmwarePatching.fabricateFirmware(
        firmwareContainer,
        metadataInput,
        patchingDataBlob
      );
    },
    async projectEmitModifiedFirmware(project, modFirmware) {
      const { firmwareDirectoryHandle, assetFirmware } = project;
      if (!assetFirmware.firmwareContainer || !firmwareDirectoryHandle)
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
