import { useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { ConfigurationEditItem } from "~/base/dto_types.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import {
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/cathedral/firmix_presenter/types.ts";
import { firmixWorkBuilder } from "~/cathedral/firmix_work/mod.ts";
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

  const submitEditItems = async (editItems: ConfigurationEditItem[]) => {
    if (!project) return;
    const modFirmware = firmixPresenter.patchLocalProjectFirmware(
      project,
      editItems,
    );
    if (0) {
      const newWork = await firmixWorkBuilder.workEmitModifiedFirmware(
        work as LocalDevelopmentWork_Loaded,
        modFirmware,
      );
      setWork(newWork);
    } else {
      downloadBinaryFileBlob(modFirmware.fileName, modFirmware.binaryBytes);
    }
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
          submitButtonLabel="ダウンロード"
          if={configurationsSourceItems}
        />
        <div if={errorMessage}>{errorMessage}</div>
      </div>
    </div>
  );
}
