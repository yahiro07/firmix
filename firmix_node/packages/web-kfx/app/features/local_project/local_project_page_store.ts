import { decodeBinaryBase64 } from "@mx/auxiliaries/base_env_adapters/base64";
import { useCallback } from "@mx/auxiliaries/fe-deps-react";
import { useReasyState } from "@mx/auxiliaries/reasy/reasy_state_local";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import {
  createIndexedDbStorageAdapter,
  createLocalStorageAdapter,
} from "@mx/auxiliaries/utils_fe/browser_storage_adapter";
import { downloadBinaryFileBlob } from "@mx/auxiliaries/utils_fe/downloading_link";
import { ensureFileHandlePermission } from "@mx/auxiliaries/utils_fe/local_filesystem_helper";
import { useEffectAsync } from "@mx/auxiliaries/utils_fe_react/hooks";
import { LocalProjectSubmissionPayload } from "@mx/web-kfx/app/base/types_dto_internal";
import { LocalDevelopmentProject } from "@mx/web-kfx/app/base/types_local_project";
import { ConfigurationEditItem } from "@mx/web-kfx/app/base/types_project_edit";
import { firmixPresenter_localProjectEdit } from "@mx/web-kfx/app/cardinal/firmix_presenter_local_project_edit/mod";
import { rpcClient } from "@mx/web-kfx/app/common/rpc_client";

const localProjectStorage =
  createLocalStorageAdapter<LocalDevelopmentProject>("fr0_local_project");
const projectDirectoryHandleStorage =
  createIndexedDbStorageAdapter<FileSystemDirectoryHandle>(
    "fr0_local_project_directory_handle"
  );

export type LocalProjectPageStore = {
  loadedFolderName?: string;
  project?: LocalDevelopmentProject;
  canSubmitProject: boolean;
  loadProjectFolder: (dirHandle: FileSystemDirectoryHandle) => Promise<void>;
  reloadProjectFolder(): Promise<void>;
  closeProjectFolder(): void;
  submitEditItems(editItems: ConfigurationEditItem[]): void;
  submitEditItems2(editItems: ConfigurationEditItem[]): Promise<void>;
  submitProject(): Promise<void>;
};

export function useLocalProjectPageStore(): LocalProjectPageStore {
  const [
    { project, projectDirectoryHandle },
    { setProject, setProjectDirectoryHandle },
  ] = useReasyState({
    projectDirectoryHandle: undefined as FileSystemDirectoryHandle | undefined,
    project: undefined as LocalDevelopmentProject | undefined,
  });

  const loadedFolderName = projectDirectoryHandle?.name;
  const canSubmitProject = project?.canSubmit ?? false;

  useEffectAsync(async () => {
    const tmpProject = localProjectStorage.read();
    if (tmpProject) {
      setProject(tmpProject);
    }
    const tmpHandle = await projectDirectoryHandleStorage.read();
    if (tmpHandle) {
      setProjectDirectoryHandle(tmpHandle);
    }
  }, []);

  const coreActions = {
    wrapSetProject(newProject: LocalDevelopmentProject | undefined) {
      setProject(newProject);
      localProjectStorage.write(newProject);
    },
    wrapSetProjectDirectoryHandle(
      newDirHandle: FileSystemDirectoryHandle | undefined
    ) {
      setProjectDirectoryHandle(newDirHandle);
      projectDirectoryHandleStorage.write(newDirHandle);
    },
  };

  const actions = {
    loadProjectFolder: useCallback(
      async (dirHandle: FileSystemDirectoryHandle) => {
        try {
          const loadedProject =
            await firmixPresenter_localProjectEdit.loadLocalDevelopmentProject(
              dirHandle
            );
          coreActions.wrapSetProject(loadedProject);
          coreActions.wrapSetProjectDirectoryHandle(dirHandle);
        } catch (error) {
          alert(error.message ?? error);
        }
      },
      []
    ),
    async reloadProjectFolder() {
      if (projectDirectoryHandle) {
        const permitted = await ensureFileHandlePermission(
          projectDirectoryHandle
        );
        if (permitted) {
          const loadedProject =
            await firmixPresenter_localProjectEdit.loadLocalDevelopmentProject(
              projectDirectoryHandle
            );
          coreActions.wrapSetProject(loadedProject);
        }
      }
    },
    closeProjectFolder() {
      coreActions.wrapSetProjectDirectoryHandle(undefined);
      coreActions.wrapSetProject(undefined);
    },
    submitEditItems(editItems: ConfigurationEditItem[]) {
      if (!project) return;
      const modFirmware =
        firmixPresenter_localProjectEdit.patchLocalProjectFirmware(
          project,
          editItems
        );
      downloadBinaryFileBlob(
        modFirmware.fileName,
        decodeBinaryBase64(modFirmware.binaryBytes_base64)
      );
    },
    async submitEditItems2(editItems: ConfigurationEditItem[]) {
      if (!project) return;
      const modFirmware =
        firmixPresenter_localProjectEdit.patchLocalProjectFirmware(
          project,
          editItems
        );
      const newProject =
        await firmixPresenter_localProjectEdit.projectEmitModifiedFirmware(
          project,
          modFirmware
        );
      coreActions.wrapSetProject(newProject);
    },
    async submitProject() {
      if (!project) return;
      const proceed = globalThis.confirm(`プロジェクトを投稿します。`);
      if (proceed) {
        const projectPayload =
          local.mapLocalDevelopmentProjectToLocalProjectSubmissionPayload(
            project
          );
        await rpcClient.upsertProjectFromLocal({ projectPayload });
        location.href = "/self-projects";
      }
    },
  };

  return {
    loadedFolderName,
    project,
    canSubmitProject,
    ...actions,
  };
}

const local = {
  mapLocalDevelopmentProjectToLocalProjectSubmissionPayload(
    project: LocalDevelopmentProject
  ): LocalProjectSubmissionPayload {
    const {
      assetReadme: { fileContent: readmeFileContent },
      assetMetadata: {
        fileContent: metadataFileContent,
        boardFileContent: boardMetadataFileContent,
      },
      assetThumbnail: { thumbnailContainer },
      assetFirmware: { firmwareContainer },
    } = project;
    if (!metadataFileContent || !thumbnailContainer || !firmwareContainer) {
      raiseError(`invalid project to submit`);
    }

    return {
      readmeFileContent: readmeFileContent ?? "",
      projectFileContent: metadataFileContent,
      boardFileContent: boardMetadataFileContent ?? "",
      firmwareFormat: firmwareContainer.kind,
      firmwareFileBytes_base64: firmwareContainer.binaryBytes_base64,
      thumbnailFileBytes_base64: thumbnailContainer.imageDataUrl.split(",")[1],
    };
  },
};
