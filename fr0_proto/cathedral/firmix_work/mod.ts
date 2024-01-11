import { produce } from "immer";
import { FirmwareContainer } from "~/cathedral/firmix_core/types.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import {
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/cathedral/firmix_presenter/types.ts";

export const firmixWorkBuilder = {
  async loadLocalDevelopmentWork(
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<LocalDevelopmentWork> {
    try {
      const dh0 = dirHandle;
      const metadataJsonFilename = "project.fm1.json";
      const fh0 = await dh0.getFileHandle(metadataJsonFilename);
      const file0 = await fh0.getFile();
      console.log({ file0 });
      const file0Text = await file0.text();
      console.log({ file0Text });

      const dh1 = await dh0.getDirectoryHandle(".pio");
      const dh2 = await dh1.getDirectoryHandle("build");
      let boardFolderName = "";
      for await (const [name, handle] of dh2) {
        console.log(name, handle.kind);
        if (handle.kind === "directory") {
          boardFolderName = name;
          break;
        }
      }
      const dh3 = await dh2.getDirectoryHandle(boardFolderName);
      const fh1 = await dh3.getFileHandle("firmware.uf2");
      const file1 = await fh1.getFile();
      console.log({ file1 });
      const file1Bytes = new Uint8Array(await file1.arrayBuffer());
      console.log({ file1Bytes });
      console.log(dh0, dh1, dh2, dh3, fh1);

      const metadataFilePath = metadataJsonFilename;
      const firmwareFilePath = `.pio/build/${boardFolderName}/firmware.uf2`;

      const project = firmixPresenter.buildLocalDevelopmentProject({
        projectRootDirectoryHandle: dirHandle,
        firmwareDirectoryHandle: dh3,
        metadataFile: { filePath: metadataFilePath, contentText: file0Text },
        firmwareFile: { filePath: firmwareFilePath, contentBytes: file1Bytes },
      });
      return { state: "loaded", project };
    } catch (error) {
      const message = error.message ?? error.toString();
      return { state: "error", message };
    }
  },
  async workEmitModifiedFirmware(
    work: LocalDevelopmentWork_Loaded,
    firmware: FirmwareContainer,
  ): Promise<LocalDevelopmentWork_Loaded> {
    const { project } = work;
    const srcFirmwareFilePath = project.assetFilePaths.firmware;
    const srcFirmwareFileName = project.firmwareContainer.fileName;
    const modFirmwareFileName = firmware.fileName;
    const modFirmwareFilePath = srcFirmwareFilePath.replace(
      srcFirmwareFileName,
      modFirmwareFileName,
    );
    const fileHandle = await project.firmwareDirectoryHandle.getFileHandle(
      modFirmwareFileName,
      { create: true },
    );
    const writable = await fileHandle.createWritable();
    await writable.write(firmware.binaryBytes);
    await writable.close();

    return produce(work, (draft) => {
      draft.project.assetFilePaths.modFirmware = modFirmwareFilePath;
    });
  },
};
