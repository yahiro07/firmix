import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { flexCentered, flexVertical } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";
import { LocalProjectAssetsArea } from "~/features/local_project/LocalProjectAssetsArea.tsx";
import { LocalProjectHeadingArea } from "~/features/local_project/LocalProjectHeadingArea.tsx";
import { LocalProjectLoadingArea } from "~/features/local_project/LocalProjectLoadingArea.tsx";
import { LocalProjectPageStore } from "~/features/local_project/local_project_page_store.ts";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";

type Props = {
  store: LocalProjectPageStore;
};

export const LocalProjectPageImpl = createFC<Props>(({ store }) => {
  const {
    loadedFolderName,
    loadProjectFolder,
    reloadProjectFolder,
    closeProjectFolder,
    work,
    project,
    configurationsSourceItems,
    submitEditItems,
    submitEditItems2,
    errorMessage,
    canSubmitProject,
    submitProject,
    projectTab,
    setProjectTab,
  } = store;

  return (
    <div q={style}>
      <LocalProjectLoadingArea
        loadedFolderName={loadedFolderName}
        loadFolder={loadProjectFolder}
        reloadFolder={reloadProjectFolder}
        closeFolder={closeProjectFolder}
        canSubmitProject={canSubmitProject}
        submitProject={submitProject}
      />
      <LocalProjectHeadingArea
        project={project!}
        if={project}
        projectTab={projectTab}
        setProjectTab={setProjectTab}
      />
      <LocalProjectAssetsArea project={project!} if={project} />
      <div if={errorMessage}>{errorMessage}</div>
      <ParametersConfigurationArea
        configurationSourceItems={configurationsSourceItems!}
        submitEditItems={submitEditItems}
        submitButtonLabel="ダウンロード"
        submit2={submitEditItems2}
        submit2Label="出力"
        if={configurationsSourceItems && projectTab === "editor"}
      />
      <div if={project && projectTab === "info"} q="readme">
        {project?.readmeFileContent}
      </div>
      <div q="blank-filler" if={!work}>
        <IconIconify spec="ph:folder-thin" q="folder-icon" />
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
    padding: 8px;
  }
`;
