import { useMemo } from "preact/hooks";
import { css } from "resin";
import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { decodeBinaryBase64 } from "~/aux/utils/utils_binary.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { ProjectTab } from "~/base/types_app_common.ts";
import { ConfigurationSourceItem, ProjectDetailDto } from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";
import { firmixPresenter_firmwarePatching } from "~/cardinal/firmix_presenter_firmware_patching/mod.ts";
import { rpcClient } from "~/common/rpc_client.ts";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";
import { ProjectHeadingArea } from "~/features/project/ProjectHeadingArea.tsx";
import { ProjectReadmeArea } from "~/features/project/ProjectReadmeArea.tsx";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPageImpl = createFC<Props>(({ project }: Props) => {
  const [{ projectTab }, { setProjectTab }] = useReasyState({
    projectTab: "info" as ProjectTab,
  });

  const { hasError, configurationSourceItems } = useMemo(() => {
    const configurationSourceItemWrappers =
      firmixCore_firmwareConfiguration.buildConfigurationSourceItems(project);

    const hasError = configurationSourceItemWrappers.some(
      (it) => it.dataKind === "error"
    );
    const configurationSourceItems =
      configurationSourceItemWrappers as ConfigurationSourceItem[];
    return { hasError, configurationSourceItems };
  }, [project]);

  const submitEditItems = async (editItems: ConfigurationEditItem[]) => {
    if (!project) return;
    if (1) {
      //ブラウザでファームウェアバイナリを取得してパッチングを行う
      //R2のCORS設定が必要
      const { fileName, fileContentBytes } =
        await firmixPresenter_firmwarePatching.generatePatchedFirmware(
          project,
          editItems
        );
      downloadBinaryFileBlob(fileName, fileContentBytes);
    } else {
      //サーバ側でバイナリの取得とパッチングを行う
      const { projectId } = project;
      const { fileName, fileContentBytes_base64 } =
        await rpcClient.generatePatchedFirmware({
          projectId,
          editItems,
        });
      const fileContentBytes = decodeBinaryBase64(fileContentBytes_base64);
      downloadBinaryFileBlob(fileName, fileContentBytes);
    }
  };

  return (
    <div q={style}>
      <ProjectHeadingArea
        projectName={project.projectName}
        tags={project.tags}
        repositoryUrl={project.repositoryUrl}
        projectTab={projectTab}
        setProjectTab={setProjectTab}
      />
      <div q="info-area">
        <div>target mcu: {project.targetMcu}</div>
        {hasError && <div>カスタムデータの定義にエラーがあります</div>}
      </div>
      <ProjectReadmeArea
        readmeFileContent={project.readmeFileContent}
        if={projectTab === "info"}
      />
      <ParametersConfigurationArea
        configurationSourceItems={configurationSourceItems}
        submitEditItems={submitEditItems}
        submitButtonLabel="ダウンロード"
        if={projectTab === "editor"}
      />
    </div>
  );
});

const style = css`
  padding: 10px;
  background: #fff;
  /* min-height: 100%; */
`;