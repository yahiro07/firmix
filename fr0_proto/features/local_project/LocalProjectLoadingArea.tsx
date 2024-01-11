import { useCallback, useEffect } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentWork } from "~/cathedral/firmix_presenter/types.ts";
import { firmixWorkBuilder } from "~/cathedral/firmix_work/mod.ts";

type Props = {
  setWork(work: LocalDevelopmentWork): void;
};

export const LocalProjectLoadingArea = createFC<Props>(({ setWork }) => {
  const [v, m] = useReasyState({
    dirHandle: undefined as FileSystemDirectoryHandle | undefined,
  });

  const loadDirectory = useCallback(
    async (dirHandle: FileSystemDirectoryHandle) => {
      m.setDirHandle(dirHandle);
      const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
        dirHandle,
      );
      setWork(loadedWork);
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
      const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
        dirHandle,
      );
      setWork(loadedWork);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleLoadFolder}>フォルダ選択</button>
        <button onClick={handleReload} disabled={!v.dirHandle}>リロード</button>
      </div>
    </div>
  );
});

const local = {
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
