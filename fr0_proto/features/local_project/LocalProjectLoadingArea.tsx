import { useEffect } from "preact/hooks";
import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { flexHorizontalAligned } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

type Props = {
  loadedFolderName: string | undefined;
  loadFolder(dirHandle: FileSystemDirectoryHandle): void;
  reloadFolder(): void;
  closeFolder(): void;
  canSubmitProject: boolean;
  submitProject(): void;
  loggedIn: boolean;
};

export const LocalProjectLoadingArea = createFC<Props>(
  ({
    loadedFolderName,
    loadFolder,
    reloadFolder,
    closeFolder,
    canSubmitProject,
    submitProject,
    loggedIn,
  }) => {
    useEffect(() => local.setupFolderDrop(loadFolder), []);

    const loaded = !!loadedFolderName;

    const handleSelectFolder = async () => {
      const dirHandle = await window.showDirectoryPicker();
      if (dirHandle) {
        loadFolder(dirHandle);
      }
    };

    return (
      <div q={style}>
        <button onClick={handleSelectFolder} if={!loaded}>
          フォルダ選択
        </button>
        <div if={loaded} q="folder">
          <IconIconify spec="mdi:folder" />
          <span>{loadedFolderName}</span>
        </div>
        <div q="spacer" />
        <button
          onClick={submitProject}
          if={loaded && loggedIn}
          disabled={!canSubmitProject}
        >
          投稿
        </button>
        <button onClick={reloadFolder} if={loaded}>
          再読み込み
        </button>
        <button onClick={closeFolder} if={loaded}>
          閉じる
        </button>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  ${flexHorizontalAligned(8)};
  > button {
    padding: 1px 6px;
  }
  > .folder {
    font-size: 18px;
    ${flexHorizontalAligned(4)};
  }
  > .spacer {
    margin-left: auto;
  }
`;

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
