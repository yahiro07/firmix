import { css } from "resin";
import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { colors } from "~/common/ui_theme.ts";
import { flexCentered, flexVertical } from "~/common/utility_styles.ts";
import { IconIconifyZ } from "~/components/IconIconifyZ.tsx";
import { LocalProjectAssetsArea } from "~/features/local_project/LocalProjectAssetsArea.tsx";
import { LocalProjectLoadingArea } from "~/features/local_project/LocalProjectLoadingArea.tsx";
import { useLocalProjectPageStore } from "~/features/local_project/local_project_page_store.ts";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";
import {
  LocalProjectHeadingAreaDummy,
  ProjectHeadingArea,
} from "~/features/project/ProjectHeadingArea.tsx";
import { ProjectReadmeArea } from "~/features/project/ProjectReadmeArea.tsx";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPageImpl = createFC<Props>(({ loggedIn }) => {
  const {
    loadedFolderName,
    loadProjectFolder,
    reloadProjectFolder,
    closeProjectFolder,
    project,
    submitEditItems,
    submitEditItems2,
    canSubmitProject,
    submitProject,
    projectTab,
    setProjectTab,
  } = useLocalProjectPageStore();

  const metadataInput = project?.assetMetadata.metadataInput;
  return (
    <div q={style}>
      <LocalProjectLoadingArea
        loadedFolderName={loadedFolderName}
        loadFolder={loadProjectFolder}
        reloadFolder={reloadProjectFolder}
        closeFolder={closeProjectFolder}
        canSubmitProject={canSubmitProject}
        submitProject={submitProject}
        loggedIn={loggedIn}
      />
      {metadataInput && (
        <ProjectHeadingArea
          projectName={metadataInput.projectName}
          tags={metadataInput.tags}
          repositoryUrl={metadataInput.repositoryUrl}
          projectTab={projectTab}
          setProjectTab={setProjectTab}
        />
      )}
      {project && !metadataInput && <LocalProjectHeadingAreaDummy />}
      <LocalProjectAssetsArea project={project!} if={project} />
      {/* <div if={errorMessage}>{errorMessage}</div> */}
      <ParametersConfigurationArea
        configurationSourceItems={project?.configurationSourceItems!}
        submitEditItems={submitEditItems}
        submitButtonLabel="ダウンロード"
        submit2={submitEditItems2}
        submit2Label="出力"
        if={project?.configurationSourceItems && projectTab === "editor"}
      />
      <ProjectReadmeArea
        q="readme"
        readmeFileContent={project?.assetReadme.fileContent!}
        if={project?.assetReadme.fileContent && projectTab === "info"}
      />
      <div q="blank-filler" if={!project}>
        <IconIconifyZ spec="ph:folder-thin" q="folder-icon" />
        <div q="text">
          ローカルプロジェクトのフォルダを
          <br />
          ドラッグ&ドロップして読み込みます
        </div>
      </div>
    </div>
  );
});

const style = css`
  height: 100%;
  background: ${colors.contentBackground};
  padding: 16px;

  ${flexVertical()};
  > .blank-filler {
    flex-grow: 1;
    ${flexCentered()};
    flex-direction: column;
    > .folder-icon {
      font-size: 70px;
    }
    > .text {
      text-align: center;
    }
  }
  > .readme {
  }
`;
