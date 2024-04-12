import { css } from "@linaria/core";
import { useEffect } from "auxiliaries/fe-deps-react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { flexAligned } from "shared/common/utility_styles";
import { ButtonSmall } from "shared/components/CommonControls";
import { IconIconifyZ } from "shared/components/IconIconifyZ";

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
      const dirHandle = await globalThis.showDirectoryPicker();
      if (dirHandle) {
        loadFolder(dirHandle);
      }
    };

    return (
      <div q={style}>
        <ButtonSmall onClick={handleSelectFolder} if={!loaded}>
          フォルダ選択
        </ButtonSmall>
        <div if={loaded} q="folder">
          <IconIconifyZ spec="mdi:folder" />
          <span>{loadedFolderName}</span>
        </div>
        <div q="spacer" />
        <ButtonSmall
          onClick={submitProject}
          if={loaded && loggedIn}
          disabled={!canSubmitProject}
        >
          投稿
        </ButtonSmall>
        <ButtonSmall onClick={reloadFolder} if={loaded}>
          再読み込み
        </ButtonSmall>
        <ButtonSmall onClick={closeFolder} if={loaded}>
          閉じる
        </ButtonSmall>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  ${flexAligned(8)};
  > .folder {
    font-size: 18px;
    ${flexAligned(4)};
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
