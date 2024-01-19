import { produce } from "immer";
import { raiseError } from "~/aux/utils/error_util.ts";
import {
  BinaryFileEntry,
  LocalDevelopmentProject,
} from "~/base/types_local_project.ts";
import { FirmwareContainer } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { createLocalDirectoryReader } from "~/cathedral/firmix_work/local_directory_reader.ts";

export const firmixWorkBuilder = {
  async loadLocalDevelopmentProject(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<LocalDevelopmentProject> {
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
    const project = await firmixPresenter.buildLocalDevelopmentProject({
      projectRootDirectoryHandle: dirHandle,
      firmwareDirectoryHandle,
      metadataFile,
      firmwareFile,
      thumbnailFile,
      readmeFile,
      firmwareFileLoadingErrorText,
    });
    return project;
  },
  async projectEmitModifiedFirmware(
    project: LocalDevelopmentProject,
    modFirmware: FirmwareContainer
  ): Promise<LocalDevelopmentProject> {
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
    await writable.write(modFirmware.binaryBytes);
    await writable.close();

    return produce(project, (draft) => {
      draft.modFirmwareFilePath = modFirmwareFilePath;
    });
  },
};
