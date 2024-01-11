import { useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { LocalDevelopmentWork } from "~/cathedral/firmix_presenter/types.ts";
import { LocalProjectAssetsArea } from "~/features/local_project/LocalProjectAssetsArea.tsx";
import { LocalProjectLoadingArea } from "~/features/local_project/LocalProjectLoadingArea.tsx";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";

export default function LocalProjectDevelopmentPage() {
  const [{ work }, { setWork }] = useReasyState({
    work: undefined as (LocalDevelopmentWork | undefined),
  });

  const project = work?.state === "loaded" && work.project ||
    undefined;
  const errorMessage = work?.state === "error" && work.message || undefined;

  const submitEditItems = (editItems: ConfigurationEditItem[]) => {
    if (!project) return;
    const modFirmware = firmixPresenter.patchLocalProjectFirmware(
      project,
      editItems,
    );
    downloadBinaryFileBlob(modFirmware.fileName, modFirmware.binaryBytes);
  };

  const configurationsSourceItems = useMemo(() =>
    project &&
      firmixPresenter.buildConfigurationSourceItems(
        project.patchingManifest,
      ) || undefined, [project]);

  return (
    <div>
      <LocalProjectLoadingArea setWork={setWork} />
      <div>
        <LocalProjectAssetsArea project={project!} if={project} />
        <ParametersConfigurationArea
          configurationSourceItems={configurationsSourceItems!}
          submitEditItems={submitEditItems}
          if={configurationsSourceItems}
        />
        <div if={errorMessage}>{errorMessage}</div>
      </div>
    </div>
  );
}
