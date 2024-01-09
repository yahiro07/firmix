import { useEffect } from "preact/hooks";

export default function LocalProjectDevelopmentPage() {
  useEffect(local.setupFolderDrop, []);
  const handleLoadFolder = async () => {
    const dirHandle = await window.showDirectoryPicker();
    if (dirHandle) {
      local.processLocalProjectFolder(dirHandle);
    }
  };
  return (
    <div>
      <button onClick={handleLoadFolder}>フォルダ選択</button>
    </div>
  );
}

const local = {
  async processLocalProjectFolder(dirHandle: FileSystemDirectoryHandle) {
    const dh0 = dirHandle;
    const fh0 = await dh0.getFileHandle("firmix.json");
    const file0 = await fh0.getFile();
    console.log({ file0 });
    const text = await file0.text();
    console.log({ text });

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
    const buffer = await file1.arrayBuffer();
    console.log({ buffer });
    console.log(dh0, dh1, dh2, dh3, fh1);

    const fh2 = await dh3.getFileHandle("firmware_patched.uf2", {
      create: true,
    });
    console.log({ fh2 });
    const writable = await fh2.createWritable();
    await writable.write(new Uint8Array([1, 2, 3, 100, 101, 102]));
    await writable.close();
    console.log("ok");
  },
  setupFolderDrop() {
    const dragHandler = (event: DragEvent) => event.preventDefault();
    const dropHandler = async (event: DragEvent) => {
      event.preventDefault();
      const item = event.dataTransfer?.items?.[0];
      if (item) {
        const handle = await item?.getAsFileSystemHandle();
        if (handle) {
          console.log({ handle });
          if (handle.kind === "directory") {
            await local.processLocalProjectFolder(
              handle as FileSystemDirectoryHandle,
            );
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
