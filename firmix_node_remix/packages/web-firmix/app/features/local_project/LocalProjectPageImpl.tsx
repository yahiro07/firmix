import { css } from "@linaria/core";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { flexCentered, flexVertical } from "shared/common/utility_styles";
import { IconIconifyZ } from "shared/components/IconIconifyZ";
import { useDateTimeTextWithElapsed } from "shared/fe_modules/display_data_hooks";
import { LocalProjectAssetsArea } from "web-firmix/app/features/local_project/LocalProjectAssetsArea";
import { LocalProjectLoadingArea } from "web-firmix/app/features/local_project/LocalProjectLoadingArea";
import { useLocalProjectPageStore } from "web-firmix/app/features/local_project/local_project_page_store";
import { ParametersConfigurationArea } from "web-firmix/app/features/project/ParametersConfigurationArea";
import {
  LocalProjectHeadingAreaDummy,
  ProjectHeadingArea,
} from "web-firmix/app/features/project/ProjectHeadingArea";
import { ProjectReadmeArea } from "web-firmix/app/features/project/ProjectReadmeArea";

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
    canSubmitProject,
    submitProject,
  } = useLocalProjectPageStore();

  const metadataInput = project?.assetMetadata.metadataInput;

  const firmwareTimeText = useDateTimeTextWithElapsed(
    project?.assetFirmware.lastModified ?? 0,
    Date.now()
  );
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
          variationName={metadataInput.variationName}
        />
      )}
      {project && !metadataInput && <LocalProjectHeadingAreaDummy />}

      <LocalProjectAssetsArea project={project!} if={project} />
      {/* <div if={errorMessage}>{errorMessage}</div> */}
      <div
        q="firmware-timestamp"
        if={project?.assetFirmware.validity === "valid"}
      >
        ファームウェアビルド日時: {firmwareTimeText}
      </div>
      <ProjectReadmeArea
        q="readme"
        readmeFileContent={project?.assetReadme.fileContent!}
        if={project?.assetReadme.fileContent}
      />
      <div q="blank-filler" if={!project}>
        <IconIconifyZ spec="ph:folder-thin" q="folder-icon" />
        <div q="text">
          ローカルプロジェクトのフォルダを
          <br />
          ドラッグ&ドロップして読み込みます
        </div>
      </div>
      <ParametersConfigurationArea
        submitEditItems={submitEditItems}
        submitButtonLabel="UF2ダウンロード"
      />
    </div>
  );
});

const style = css`
  height: 100%;
  background: var(--cl-content-background);
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
  > .firmware-timestamp {
    margin: 0 8px;
  }
  > .readme {
  }
`;
