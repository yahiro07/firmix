import { produce } from "immer";
import {
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/base/types_local_project.ts";
import { FirmwareContainer } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { createLocalDirectoryReader } from "~/cathedral/firmix_work/local_directory_reader.ts";

export const firmixWorkBuilder = {
  async loadLocalDevelopmentWork(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<LocalDevelopmentWork> {
    try {
      const dirReader = createLocalDirectoryReader(dirHandle);
      const boardFolderName = await dirReader.getSingleSubDirectoryNameUnder(
        `.pio/build`
      );
      const firmwareDirectoryHandle = await dirReader.getSubDirectoryHandle(
        `.pio/build/${boardFolderName}`
      );
      const firmwareFile = await dirReader.readBinaryFile(
        `.pio/build/${boardFolderName}/firmware.uf2`
      );
      const metadataFile = await dirReader.readTextFile(`project.fm1.json`);
      const thumbnailFile = await dirReader.readBinaryFile(`thumbnail.jpg`);
      const readmeFile = await dirReader.readTextFile("readme.md");
      const project = await firmixPresenter.buildLocalDevelopmentProject({
        projectRootDirectoryHandle: dirHandle,
        firmwareDirectoryHandle,
        metadataFile,
        firmwareFile,
        thumbnailFile,
        readmeFile,
      });
      return { state: "loaded", project };
    } catch (error) {
      const message = error.message ?? error.toString();
      console.error(error);
      return { state: "error", message };
    }
  },
  async workEmitModifiedFirmware(
    work: LocalDevelopmentWork_Loaded,
    firmware: FirmwareContainer
  ): Promise<LocalDevelopmentWork_Loaded> {
    const { project } = work;
    const srcFirmwareFilePath = project.assetFilePaths.firmware;
    const srcFirmwareFileName = project.firmwareContainer.fileName;
    const modFirmwareFileName = firmware.fileName;
    const modFirmwareFilePath = srcFirmwareFilePath.replace(
      srcFirmwareFileName,
      modFirmwareFileName
    );
    const fileHandle = await project.firmwareDirectoryHandle.getFileHandle(
      modFirmwareFileName,
      { create: true }
    );
    const writable = await fileHandle.createWritable();
    await writable.write(firmware.binaryBytes);
    await writable.close();

    return produce(work, (draft) => {
      draft.project.assetFilePaths.modFirmware = modFirmwareFilePath;
    });
  },
};
