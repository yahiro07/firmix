import { useEffect } from "@mx/auxiliaries/fe-deps-react";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { HStack, Spacer } from "../../../styled-system/jsx";
import { ButtonSmall } from "../../components/CommonControls";
import { IconIconifyZ } from "../../components/IconIconifyZ";

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
      <HStack gap="2" padding="2">
        <ButtonSmall onClick={handleSelectFolder} if={!loaded}>
          フォルダ選択
        </ButtonSmall>
        <HStack if={loaded} gap="1" fontSize="18px">
          <IconIconifyZ spec="mdi:folder" />
          <span>{loadedFolderName}</span>
        </HStack>
        <Spacer />
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
      </HStack>
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
