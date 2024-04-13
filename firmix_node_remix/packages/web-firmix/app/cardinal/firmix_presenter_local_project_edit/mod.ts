import { raiseError } from "auxiliaries/utils/error_util";
import { filePathHelper } from "auxiliaries/utils/file_path_helper";
import {
  BinaryFileEntryWithTimestamp,
  LocalDevelopmentProject,
} from "web-firmix/app/base/types_local_project";
import { FirmwareContainer } from "web-firmix/app/base/types_project_edit";

import { createLocalDirectoryReader } from "web-firmix/app/cardinal/firmix_presenter_common_modules/local_directory_reader";
import { localAssetBuilder } from "web-firmix/app/cardinal/firmix_presenter_local_project_edit/local_asset_builder";

type FirmixPresenter_LocalProjectEdit = {
  loadLocalDevelopmentProject(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<LocalDevelopmentProject>;
  patchLocalProjectFirmware(
    project: LocalDevelopmentProject
  ): FirmwareContainer;
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

      return {
        projectRootDirectoryHandle: dirHandle,
        firmwareDirectoryHandle,
        assetReadme,
        assetMetadata,
        assetThumbnail,
        assetFirmware,
        canSubmit,
      };
    },
    patchLocalProjectFirmware(project) {
      const {
        assetFirmware: { firmwareContainer },
        assetMetadata: { metadataInput },
      } = project;
      if (!firmwareContainer || !metadataInput) raiseError(`invalid condition`);
      return firmwareContainer;
    },
  };
