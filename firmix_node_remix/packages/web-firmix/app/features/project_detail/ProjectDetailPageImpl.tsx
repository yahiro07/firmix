import { css } from "@linaria/core";
import { decodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { useMemo } from "auxiliaries/fe-deps-react";
import { getDateTimeText_yyyyMMddHHmmss } from "auxiliaries/utils/date_time_helper.ts";
import { downloadBinaryFileBlob } from "auxiliaries/utils_fe/downloading_link.ts";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import {
  ConfigurationSourceItem,
  ProjectDetailDto,
} from "web-firmix/app/base/types_dto.ts";
import { ConfigurationEditItem } from "web-firmix/app/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "web-firmix/app/cardinal/firmix_core_firmware_configuration/mod.ts";
import { firmixPresenter_firmwarePatching } from "web-firmix/app/cardinal/firmix_presenter_firmware_patching/mod.ts";
import { rpcClient } from "web-firmix/app/common/rpc_client.ts";
import { useSiteContext } from "web-firmix/app/common/site_context.ts";
import { ParametersConfigurationArea } from "web-firmix/app/features/project/ParametersConfigurationArea.tsx";
import {
  LinkChildProjectListPage,
  LinkParentProjectPage,
} from "web-firmix/app/features/project/project_common_parts.tsx";
import { ProjectHeadingArea } from "web-firmix/app/features/project/ProjectHeadingArea.tsx";
import { ProjectReadmeArea } from "web-firmix/app/features/project/ProjectReadmeArea.tsx";
import { ProjectOperationPart } from "web-firmix/app/features/project_detail/ProjectOperationPart.tsx";

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
    <div q={style}>
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
      <div q="info-area">
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
          q="link-derived"
        />
        <LinkParentProjectPage
          projectId={project.parentProjectId}
          if={!!project.parentProjectId}
          q="link-parent"
        />
        {hasError && <div>カスタムデータの定義にエラーがあります</div>}
      </div>
      <ProjectReadmeArea readmeFileContent={project.readmeFileContent} />
      <ParametersConfigurationArea
        configurationSourceItems={configurationSourceItems}
        submitEditItems={submitEditItems}
        submitButtonLabel="UF2ダウンロード"
        pinNumbersMap={project.pinNumbersMap}
      />
    </div>
  );
});

const style = css`
  padding: 16px;
  background: var(--cl-content-background);
  /* min-height: 100%; */
  > .info-area {
    padding: 0 8px;
    > .link-parent,
    > .link-derived {
      margin-left: 3px;
      margin-top: 8px;
      display: inline-flex;
    }
  }
`;
