import { useCallback, useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import {
  createIndexedDbStorageAdapter,
  createLocalStorageAdapter,
} from "~/aux/utils_fe/browser_storage_adapter.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { useEffectAsync } from "~/aux/utils_fe/hooks.ts";
import { ensureFileHandlePermission } from "~/aux/utils_fe/local_filesystem_helper.ts";
import { LocalProjectSubmissionInputDto } from "~/base/types_dto.ts";
import {
  LocalDevelopmentProject,
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/base/types_local_project.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { firmixWorkBuilder } from "~/cathedral/firmix_work/mod.ts";
import { rpcClient } from "~/common/rpc_client.ts";

const localProjectWorkStorage = createLocalStorageAdapter<LocalDevelopmentWork>(
  "fr0_local_project_work"
);
const projectDirectoryHandleStorage =
  createIndexedDbStorageAdapter<FileSystemDirectoryHandle>(
    "fr0_local_project_directory_handle"
  );

export type LocalProjectPageStore = ReturnType<typeof useLocalProjectPageStore>;

export function useLocalProjectPageStore() {
  const [
    { work, projectDirectoryHandle },
    { setWork, setProjectDirectoryHandle },
  ] = useReasyState({
    projectDirectoryHandle: undefined as FileSystemDirectoryHandle | undefined,
    work: undefined as LocalDevelopmentWork | undefined,
  });

  const loadedFolderName = projectDirectoryHandle?.name;

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

  useEffectAsync(async () => {
    const tmpWork = localProjectWorkStorage.read();
    if (tmpWork) {
      setWork(tmpWork);
    }
    const tmpHandle = await projectDirectoryHandleStorage.read();
    if (tmpHandle) {
      setProjectDirectoryHandle(tmpHandle);
    }
  }, []);

  const coreActions = {
    wrapSetWork(newWork: LocalDevelopmentWork | undefined) {
      setWork(newWork);
      localProjectWorkStorage.write(newWork);
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
        coreActions.wrapSetProjectDirectoryHandle(dirHandle);
        const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
          dirHandle
        );
        coreActions.wrapSetWork(loadedWork);
      },
      []
    ),
    async reloadProjectFolder() {
      if (projectDirectoryHandle) {
        const permitted = await ensureFileHandlePermission(
          projectDirectoryHandle
        );
        if (permitted) {
          const loadedWork = await firmixWorkBuilder.loadLocalDevelopmentWork(
            projectDirectoryHandle
          );
          coreActions.wrapSetWork(loadedWork);
        }
      }
    },
    closeProjectFolder() {
      coreActions.wrapSetProjectDirectoryHandle(undefined);
      coreActions.wrapSetWork(undefined);
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
      coreActions.wrapSetWork(newWork);
    },
    async handleSubmit() {
      if (!project) return;
      const projectInput =
        local.mapLocalDevelopmentProjectToLocalProjectSubmissionInputDto(
          project
        );
      await rpcClient.createProjectFromLocal({ projectInput });
    },
  };

  return {
    loadedFolderName,
    work,
    project,
    configurationsSourceItems,
    errorMessage,
    ...actions,
  };
}

const local = {
  mapLocalDevelopmentProjectToLocalProjectSubmissionInputDto(
    project: LocalDevelopmentProject
  ): LocalProjectSubmissionInputDto {
    return {
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
  },
};
