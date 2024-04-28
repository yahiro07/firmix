import { Box } from "@mui/system";
import { decodeBinaryBase64 } from "@mx/auxiliaries/base_env_adapters/base64";
import { getDateTimeText_yyyyMMddHHmmss } from "@mx/auxiliaries/utils/date_time_helper";
import { downloadBinaryFileBlob } from "@mx/auxiliaries/utils_fe/downloading_link";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "@mx/web-firmix-nextjs/src/base/types_dto";
import { rpcClient } from "@mx/web-firmix-nextjs/src/common/rpc_client";
import { useSiteContext } from "@mx/web-firmix-nextjs/src/common/site_context";
import {
  LinkChildProjectListPage,
  LinkParentProjectPage,
} from "@mx/web-firmix-nextjs/src/features/project/project_common_parts";
import { ProjectHeadingArea } from "@mx/web-firmix-nextjs/src/features/project/ProjectHeadingArea";
import { ProjectReadmeArea } from "@mx/web-firmix-nextjs/src/features/project/ProjectReadmeArea";
import { ProjectOperationPart } from "@mx/web-firmix-nextjs/src/features/project_detail/ProjectOperationPart";
import { firmixPresenter_firmwarePatching } from "../../cardinal/firmix_presenter_firmware_patching/mod";
import { FirmwareDownloadButtonArea } from "../project/FirmwareDownloadButton";

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
    <Box padding="16px" bgcolor="var(--cl-content-background)">
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
          sx={{
            marginTop: "8px",
            marginLeft: "3px",
          }}
        />
        <LinkParentProjectPage
          projectId={project.parentProjectId}
          if={!!project.parentProjectId}
          sx={{
            marginTop: "8px",
            marginLeft: "3px",
          }}
        />
      </Box>
      <ProjectReadmeArea readmeFileContent={project.readmeFileContent} />
      <FirmwareDownloadButtonArea
        label="UF2ダウンロード"
        handler={submitEditItems}
      />
    </Box>
  );
});
