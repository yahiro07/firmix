import { useMemo } from "preact/hooks";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";

import {
  LocalDevelopmentWork,
  LocalDevelopmentWork_Loaded,
} from "~/base/types_local_project.ts";
import { firmixWorkBuilder } from "~/cathedral/firmix_work/mod.ts";
import { rpcClient } from "~/common/rpc_client.ts";
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

  const submitEditItems2 = async (editItems: ConfigurationEditItem[]) => {
    if (!project) return;
    const modFirmware = firmixPresenter.patchLocalProjectFirmware(
      project,
      editItems,
    );
    const newWork = await firmixWorkBuilder.workEmitModifiedFirmware(
      work as LocalDevelopmentWork_Loaded,
      modFirmware,
    );
    setWork(newWork);
  };

  const configurationsSourceItems = useMemo(() =>
    project &&
      firmixPresenter.buildConfigurationSourceItems(
        project.patchingManifest,
      ) || undefined, [project]);

  const handleSubmit = async () => {
    if (!project) return;
    const projectInput = project.metadataInput;
    await rpcClient.createProjectFromLocal({ projectInput });
  };

  return (
    <div>
      <LocalProjectLoadingArea setWork={setWork} />
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
      <button onClick={handleSubmit} disabled={!project}>投稿</button>
    </div>
  );
}
