import { useCallback, useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import {
  createIndexedDbStorageAdapter,
  createLocalStorageAdapter,
} from "~/aux/utils_fe/browser_storage_adapter.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { useEffectAsync } from "~/aux/utils_fe/hooks.ts";
import { ensureFileHandlePermission } from "~/aux/utils_fe/local_filesystem_helper.ts";
import { ProjectTab } from "~/base/types_app_common.ts";
import {
  ConfigurationSourceItemWrapper,
  LocalProjectSubmissionInputDto,
} from "~/base/types_dto.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";
import { firmixPresenter_localProjectEdit } from "~/cardinal/firmix_presenter_local_project_edit/mod.ts";
import { rpcClient } from "~/common/rpc_client.ts";

const localProjectStorage =
  createLocalStorageAdapter<LocalDevelopmentProject>("fr0_local_project");
const projectDirectoryHandleStorage =
  createIndexedDbStorageAdapter<FileSystemDirectoryHandle>(
    "fr0_local_project_directory_handle"
  );

export type LocalProjectPageStore = {
  loadedFolderName?: string;
  project?: LocalDevelopmentProject;
  configurationsSourceItems?: ConfigurationSourceItemWrapper[];
  canSubmitProject: boolean;
  projectTab: ProjectTab;
  loadProjectFolder: (dirHandle: FileSystemDirectoryHandle) => Promise<void>;
  reloadProjectFolder(): Promise<void>;
  closeProjectFolder(): void;
  submitEditItems(editItems: ConfigurationEditItem[]): void;
  submitEditItems2(editItems: ConfigurationEditItem[]): Promise<void>;
  submitProject(): Promise<void>;
  setProjectTab: (value: ProjectTab) => void;
};

export function useLocalProjectPageStore(): LocalProjectPageStore {
  const [
    { projectTab, project, projectDirectoryHandle },
    { setProjectTab, setProject, setProjectDirectoryHandle },
  ] = useReasyState({
    projectTab: "info" as ProjectTab,
    projectDirectoryHandle: undefined as FileSystemDirectoryHandle | undefined,
    project: undefined as LocalDevelopmentProject | undefined,
  });

  const loadedFolderName = projectDirectoryHandle?.name;

  const configurationsSourceItems = useMemo(() => {
    if (project?.assetMetadata.metadataInput) {
      return firmixCore_firmwareConfiguration.buildConfigurationSourceItems(
        project.assetMetadata.metadataInput
      );
    }
    return undefined;
  }, [project]);

  const canSubmitProject = !!project;

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
      downloadBinaryFileBlob(modFirmware.fileName, modFirmware.binaryBytes);
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
      const proceed = window.confirm(`プロジェクトを投稿します。`);
      if (proceed) {
        const projectInput =
          local.mapLocalDevelopmentProjectToLocalProjectSubmissionInputDto(
            project
          );
        await rpcClient.createProjectFromLocal({ projectInput });
      }
    },
  };

  return {
    loadedFolderName,
    project,
    configurationsSourceItems,
    canSubmitProject,
    projectTab,
    setProjectTab,
    ...actions,
  };
}

const local = {
  mapLocalDevelopmentProjectToLocalProjectSubmissionInputDto(
    project: LocalDevelopmentProject
  ): LocalProjectSubmissionInputDto {
    const {
      assetMetadata: { metadataInput },
      assetThumbnail: { thumbnailContainer },
      assetFirmware: { firmwareContainer },
    } = project;
    if (!(metadataInput && thumbnailContainer && firmwareContainer)) {
      raiseError(`invalid project to submit`);
    }
    return {
      ...metadataInput,
      firmwareObject: {
        fileName: firmwareContainer.fileName,
        binaryBytes: firmwareContainer.binaryBytes,
      },
      thumbnailObject: {
        fileName: thumbnailContainer.fileName,
        binaryBytes: thumbnailContainer.binaryBytes,
        mimeType: thumbnailContainer.mimeType,
      },
      readmeFileContent: project.assetReadme.fileContent ?? "",
    };
  },
};
