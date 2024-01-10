import { useCallback, useEffect } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { LocalDevelopmentWork } from "~/cathedral/firmix_presenter/types.ts";

export default function LocalProjectDevelopmentPage() {
  const [v, m] = useReasyState({
    dirHandle: undefined as FileSystemDirectoryHandle | undefined,
    work: undefined as (LocalDevelopmentWork | undefined),
  });

  const loadDirectory = useCallback(
    async (dirHandle: FileSystemDirectoryHandle) => {
      m.setDirHandle(dirHandle);
      const loadedWork = await local.loadLocalDevelopmentWork(dirHandle);
      m.setWork(loadedWork);
    },
    [],
  );

  useEffect(() => local.setupFolderDrop(loadDirectory), []);

  const handleLoadFolder = async () => {
    const dirHandle = await window.showDirectoryPicker();
    if (dirHandle) {
      loadDirectory(dirHandle);
    }
  };

  const handleReload = async () => {
    const dirHandle = v.dirHandle;
    if (dirHandle) {
      const loadedWork = await local.loadLocalDevelopmentWork(dirHandle);
      m.setWork(loadedWork);
    }
  };

  return (
    <div>
      <div>
        {v.work}
      </div>
      <button onClick={handleLoadFolder}>フォルダ選択</button>
      <button onClick={handleReload} disabled={!v.dirHandle}>リロード</button>
    </div>
  );
}

const local = {
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

      if (0) {
        const fh2 = await dh3.getFileHandle("firmware_patched.uf2", {
          create: true,
        });
        console.log({ fh2 });
        const writable = await fh2.createWritable();
        await writable.write(new Uint8Array([1, 2, 3, 100, 101, 102]));
        await writable.close();
        console.log("ok");
      }
      const project = firmixPresenter.buildLocalDevelopmentProject({
        metadataFile: { filePath: metadataFilePath, contentText: file0Text },
        firmwareFile: { filePath: firmwareFilePath, contentBytes: file1Bytes },
      });
      return { state: "loaded", project };
    } catch (error) {
      const message = error.message ?? error.toString();
      return { state: "error", message };
    }
  },
  setupFolderDrop(
    loadDirectory: (dirHandle: FileSystemDirectoryHandle) => void,
  ) {
    const dragHandler = (event: DragEvent) => event.preventDefault();
    const dropHandler = async (event: DragEvent) => {
      event.preventDefault();
      const item = event.dataTransfer?.items?.[0];
      if (item) {
        const handle = await item?.getAsFileSystemHandle();
        if (handle) {
          console.log({ handle });
          if (handle.kind === "directory") {
            loadDirectory(handle as FileSystemDirectoryHandle);
          }
        }
      }
    };
    document.addEventListener("dragover", dragHandler);
    document.addEventListener("drop", dropHandler);
    return () => {
      document.removeEventListener("dragover", dragHandler);
      document.removeEventListener("drop", dropHandler);
    };
  },
};
