import { decodeBinaryBase64 } from "@mx/auxiliaries/base_env_adapters/base64";
import { useMemo } from "@mx/auxiliaries/fe-deps-react";
import { getDateTimeText_yyyyMMddHHmmss } from "@mx/auxiliaries/utils/date_time_helper";
import { downloadBinaryFileBlob } from "@mx/auxiliaries/utils_fe/downloading_link";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import {
  ConfigurationSourceItem,
  ProjectDetailDto,
} from "@mx/web-kfx/app/base/types_dto";
import { ConfigurationEditItem } from "@mx/web-kfx/app/base/types_project_edit";
import { firmixCore_firmwareConfiguration } from "@mx/web-kfx/app/cardinal/firmix_core_firmware_configuration/mod";
import { firmixPresenter_firmwarePatching } from "@mx/web-kfx/app/cardinal/firmix_presenter_firmware_patching/mod";
import { rpcClient } from "@mx/web-kfx/app/common/rpc_client";
import { useSiteContext } from "@mx/web-kfx/app/common/site_context";
import { ParametersConfigurationArea } from "@mx/web-kfx/app/features/project/ParametersConfigurationArea";
import {
  LinkChildProjectListPage,
  LinkParentProjectPage,
} from "@mx/web-kfx/app/features/project/project_common_parts";
import { ProjectHeadingArea } from "@mx/web-kfx/app/features/project/ProjectHeadingArea";
import { ProjectReadmeArea } from "@mx/web-kfx/app/features/project/ProjectReadmeArea";
import { ProjectOperationPart } from "@mx/web-kfx/app/features/project_detail/ProjectOperationPart";
import { css } from "../../../styled-system/css";
import { Box } from "../../../styled-system/jsx";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPageImpl = createFC<Props>(({ project }: Props) => {
  const { loginUser } = useSiteContext();
  const isSelfProject = project.userId === loginUser?.userId;

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

  const firmwareUpdateAtText = getDateTimeText_yyyyMMddHHmmss(
    project.firmwareUpdateAt
  );

  return (
    <Box padding="16px" background="var(--cl-content-background)">
      <ProjectHeadingArea
        projectName={project.projectName}
        variationName={project.variationName}
        tags={project.tags}
        repositoryUrl={project.repositoryUrl}
        authorInfo={{
          userName: project.userName,
          userAvatarUrl: project.userAvatarUrl,
        }}
        operationUiAdditional={
          <ProjectOperationPart
            projectId={project.projectId}
            published={project.published}
            automated={project.automated}
            if={isSelfProject}
          />
        }
      />
      <Box padding="0 8px">
        <div>ターゲットMCU: {project.targetMcu}</div>
        <div>ファームウェア更新日時: {firmwareUpdateAtText}</div>
        <div>ファームウェアリビジョン: {project.firmwareRevision}</div>
        <div if={false}>
          公開状態: {project.published ? "公開" : "ドラフト"}
        </div>
        <div if={false}>
          投稿ソース: {project.automated ? "API経由" : "ローカル"}
        </div>
        <LinkChildProjectListPage
          project={project}
          if={project.numChildProjects > 0}
          q={css({
            marginTop: "8px",
            marginLeft: "3px",
          })}
        />
        <LinkParentProjectPage
          projectId={project.parentProjectId}
          if={!!project.parentProjectId}
          q={css({
            marginTop: "8px",
            marginLeft: "3px",
          })}
        />
        {hasError && <div>カスタムデータの定義にエラーがあります</div>}
      </Box>
      <ProjectReadmeArea readmeFileContent={project.readmeFileContent} />
      <ParametersConfigurationArea
        configurationSourceItems={configurationSourceItems}
        submitEditItems={submitEditItems}
        submitButtonLabel="UF2ダウンロード"
        pinNumbersMap={project.pinNumbersMap}
      />
    </Box>
  );
});
