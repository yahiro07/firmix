import { useCallback, useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { css } from "~/aux/resin/resin_css.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { LocalProjectSubmissionInputDto } from "~/base/types_dto.ts";
import {
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/base/types_local_project.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { firmixWorkBuilder } from "~/cathedral/firmix_work/mod.ts";
import { rpcClient } from "~/common/rpc_client.ts";
import { flexCentered, flexVertical } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";
import { LocalProjectAssetsArea } from "~/features/local_project/LocalProjectAssetsArea.tsx";
import { LocalProjectLoadingArea } from "~/features/local_project/LocalProjectLoadingArea.tsx";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";

function useLocalDevelopmentPageStore() {
  const [
    { work, projectDirectoryHandle },
    { setWork, setProjectDirectoryHandle },
  ] = useReasyState({
    projectDirectoryHandle: undefined as FileSystemDirectoryHandle | undefined,
    work: undefined as LocalDevelopmentWork | undefined,
  });

  const folderLoaded = !!projectDirectoryHandle;

  const project = (work?.state === "loaded" && work.project) || undefined;
  const errorMessage = (work?.state === "error" && work.message) || undefined;

  const configurationsSourceItems = useMemo(
    () =>
      (project &&
        firmixPresenter.buildConfigurationSourceItems(
          project.patchingManifest
        )) ||
      undefined,
    [project]
  );

  const actions = {
    loadProjectFolder: useCallback(
      async (dirHandle: FileSystemDirectoryHandle) => {
        setProjectDirectoryHandle(dirHandle);
        const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
          dirHandle
        );
        setWork(loadedWork);
      },
      []
    ),
    async reloadProjectFolder() {
      if (projectDirectoryHandle) {
        const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
          projectDirectoryHandle
        );
        setWork(loadedWork);
      }
    },
    closeProjectFolder() {
      setProjectDirectoryHandle(undefined);
      setWork(undefined);
    },
    submitEditItems(editItems: ConfigurationEditItem[]) {
      if (!project) return;
      const modFirmware = firmixPresenter.patchLocalProjectFirmware(
        project,
        editItems
      );
      downloadBinaryFileBlob(modFirmware.fileName, modFirmware.binaryBytes);
    },
    async submitEditItems2(editItems: ConfigurationEditItem[]) {
      if (!project) return;
      const modFirmware = firmixPresenter.patchLocalProjectFirmware(
        project,
        editItems
      );
      const newWork = await firmixWorkBuilder.workEmitModifiedFirmware(
        work as LocalDevelopmentWork_Loaded,
        modFirmware
      );
      setWork(newWork);
    },
    async handleSubmit() {
      if (!project) return;
      const projectInput: LocalProjectSubmissionInputDto = {
        ...project.metadataInput,
        firmwareObject: {
          fileName: project.firmwareContainer.fileName,
          binaryBytes: project.firmwareContainer.binaryBytes,
        },
        thumbnailObject: {
          fileName: project.thumbnailImageContainer.fileName,
          binaryBytes: project.thumbnailImageContainer.binaryBytes,
          mimeType: project.thumbnailImageContainer.mimeType,
        },
        readmeFileContent: project.readmeFileContent,
      };
      await rpcClient.createProjectFromLocal({ projectInput });
    },
  };

  return {
    folderLoaded,
    work,
    project,
    configurationsSourceItems,
    errorMessage,
    ...actions,
  };
}
export default function LocalProjectDevelopmentPage() {
  const {
    folderLoaded,
    loadProjectFolder,
    reloadProjectFolder,
    closeProjectFolder,
    work,
    project,
    configurationsSourceItems,
    submitEditItems,
    submitEditItems2,
    errorMessage,
    handleSubmit,
  } = useLocalDevelopmentPageStore();

  return (
    <div q={style}>
      <LocalProjectLoadingArea
        folderLoaded={folderLoaded}
        loadFolder={loadProjectFolder}
        reloadFolder={reloadProjectFolder}
        closeFolder={closeProjectFolder}
      />
      <div>
        <LocalProjectAssetsArea project={project!} if={project} />
        <ParametersConfigurationArea
          configurationSourceItems={configurationsSourceItems!}
          submitEditItems={submitEditItems}
          submitButtonLabel="ダウンロード"
          submit2={submitEditItems2}
          submit2Label="出力"
          if={configurationsSourceItems}
        />
        <div if={errorMessage}>{errorMessage}</div>
      </div>
      <button onClick={handleSubmit} disabled={!project}>
        投稿
      </button>
      <div if={project}>{project?.readmeFileContent}</div>
      <div q="blank-filler" if={!work}>
        <IconIconify spec="ph:folder-thin" q="folder-icon" />
        <div q="text">
          ローカルプロジェクトのフォルダを
          <br />
          ドラッグ&ドロップして読み込みます
        </div>
      </div>
    </div>
  );
}

const style = css`
  height: 100%;
  ${flexVertical()};
  > .blank-filler {
    flex-grow: 1;
    ${flexCentered()};
    flex-direction: column;
    > .folder-icon {
      font-size: 70px;
    }
    > .text {
      text-align: center;
    }
  }
`;
