import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { flexCentered, flexVertical } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";
import { LocalProjectAssetsArea } from "~/features/local_project/LocalProjectAssetsArea.tsx";
import { LocalProjectLoadingArea } from "~/features/local_project/LocalProjectLoadingArea.tsx";
import { LocalProjectPageStore } from "~/features/local_project/local_project_page_store.ts";
import { ParametersConfigurationArea } from "~/features/project/ParametersConfigurationArea.tsx";

type Props = {
  store: LocalProjectPageStore;
};

export const LocalProjectPageImpl = createFC<Props>(({ store }) => {
  const {
    folderLoaded,
    loadProjectFolder,
    reloadProjectFolder,
    closeProjectFolder,
    work,
    project,
    configurationsSourceItems,
    submitEditItems,
    submitEditItems2,
    errorMessage,
    handleSubmit,
  } = store;

  return (
    <div q={style}>
      <LocalProjectLoadingArea
        folderLoaded={folderLoaded}
        loadFolder={loadProjectFolder}
        reloadFolder={reloadProjectFolder}
        closeFolder={closeProjectFolder}
      />
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
      <button onClick={handleSubmit} disabled={!project}>
        投稿
      </button>
      <div if={project}>{project?.readmeFileContent}</div>
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
`;
