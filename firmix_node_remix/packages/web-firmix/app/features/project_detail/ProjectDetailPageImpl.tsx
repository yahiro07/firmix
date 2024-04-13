import { css } from "@linaria/core";
import { decodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { getDateTimeText_yyyyMMddHHmmss } from "auxiliaries/utils/date_time_helper";
import { downloadBinaryFileBlob } from "auxiliaries/utils_fe/downloading_link";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "web-firmix/app/base/types_dto";
import { rpcClient } from "web-firmix/app/common/rpc_client";
import { useSiteContext } from "web-firmix/app/common/site_context";
import { ParametersConfigurationArea } from "web-firmix/app/features/project/ParametersConfigurationArea";
import {
  LinkChildProjectListPage,
  LinkParentProjectPage,
} from "web-firmix/app/features/project/project_common_parts";
import { ProjectHeadingArea } from "web-firmix/app/features/project/ProjectHeadingArea";
import { ProjectReadmeArea } from "web-firmix/app/features/project/ProjectReadmeArea";
import { ProjectOperationPart } from "web-firmix/app/features/project_detail/ProjectOperationPart";
import { firmixPresenter_firmwarePatching } from "../../cardinal/firmix_presenter_firmware_patching/mod";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPageImpl = createFC<Props>(({ project }: Props) => {
  const { loginUser } = useSiteContext();
  const isSelfProject = project.userId === loginUser?.userId;

  const submitEditItems = async () => {
    if (!project) return;
    if (1) {
      //ブラウザでファームウェアバイナリを取得してパッチングを行う
      //R2のCORS設定が必要
      const { fileName, fileContentBytes } =
        await firmixPresenter_firmwarePatching.generatePatchedFirmware(project);
      downloadBinaryFileBlob(fileName, fileContentBytes);
    } else {
      //サーバ側でバイナリの取得とパッチングを行う
      const { projectId } = project;
      const { fileName, fileContentBytes_base64 } =
        await rpcClient.generatePatchedFirmware({ projectId });
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
      </div>
      <ProjectReadmeArea readmeFileContent={project.readmeFileContent} />
      <ParametersConfigurationArea
        submitEditItems={submitEditItems}
        submitButtonLabel="UF2ダウンロード"
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
