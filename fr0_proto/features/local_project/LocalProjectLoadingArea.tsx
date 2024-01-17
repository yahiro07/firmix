import { useEffect } from "preact/hooks";
import { createFC } from "~/aux/utils_fe/create_fc.ts";

type Props = {
  folderLoaded: boolean;
  loadFolder(dirHandle: FileSystemDirectoryHandle): void;
  reloadFolder(): void;
  closeFolder(): void;
};

export const LocalProjectLoadingArea = createFC<Props>(
  ({ folderLoaded, loadFolder, reloadFolder, closeFolder }) => {
    useEffect(() => local.setupFolderDrop(loadFolder), []);

    const handleSelectFolder = async () => {
      const dirHandle = await window.showDirectoryPicker();
      if (dirHandle) {
        loadFolder(dirHandle);
      }
    };

    return (
      <div>
        <div>
          <button onClick={handleSelectFolder}>フォルダ選択</button>
          <button onClick={reloadFolder} disabled={!folderLoaded}>
            再読み込み
          </button>
          <button onClick={closeFolder} disabled={!folderLoaded}>
            閉じる
          </button>
        </div>
      </div>
    );
  }
);

const local = {
  setupFolderDrop(
    loadDirectory: (dirHandle: FileSystemDirectoryHandle) => void
  ) {
    const dragHandler = (event: DragEvent) => event.preventDefault();
    const dropHandler = async (event: DragEvent) => {
      event.preventDefault();
      const item = event.dataTransfer?.items?.[0];
      if (item) {
        const handle = await item?.getAsFileSystemHandle();
        if (handle) {
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
