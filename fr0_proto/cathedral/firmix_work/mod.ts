import { produce } from "immer";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";
import { FirmwareContainer } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { createLocalDirectoryReader } from "~/cathedral/firmix_work/local_directory_reader.ts";

export const firmixWorkBuilder = {
  async loadLocalDevelopmentProject(
    dirHandle: FileSystemDirectoryHandle
  ): Promise<LocalDevelopmentProject> {
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
    return project;
    // try {
    //   // return { state: "loaded", project };
    // } catch (error) {
    //   const message = error.message ?? error.toString();
    //   console.error(error);
    //   alert(message);
    //   // return { state: "error", message };
    // }
  },
  async projectEmitModifiedFirmware(
    project: LocalDevelopmentProject,
    firmware: FirmwareContainer
  ): Promise<LocalDevelopmentProject> {
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

    return produce(project, (draft) => {
      draft.assetFilePaths.modFirmware = modFirmwareFilePath;
    });
  },
};
