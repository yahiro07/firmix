import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";

import { useDateTimeTextWithElapsed } from "@mx/shared/fe_modules/display_data_hooks";
import { LocalProjectAssetsArea } from "@mx/web-firmix-nextjs/src/features/local_project/LocalProjectAssetsArea";
import { LocalProjectLoadingArea } from "@mx/web-firmix-nextjs/src/features/local_project/LocalProjectLoadingArea";
import { useLocalProjectPageStore } from "@mx/web-firmix-nextjs/src/features/local_project/local_project_page_store";
import {
  LocalProjectHeadingAreaDummy,
  ProjectHeadingArea,
} from "@mx/web-firmix-nextjs/src/features/project/ProjectHeadingArea";
import { ProjectReadmeArea } from "@mx/web-firmix-nextjs/src/features/project/ProjectReadmeArea";
import { css } from "../../../styled-system/css";
import { Box, Center, Stack } from "../../../styled-system/jsx";
import { IconIconifyZ } from "../../components/IconIconifyZ";
import { FirmwareDownloadButtonArea } from "../project/FirmwareDownloadButton";

const BuildDateTimePart = createFC<{ timestamp: number | undefined }>(
  ({ timestamp }) => {
    const timeText = useDateTimeTextWithElapsed(timestamp ?? 0, Date.now());
    return <Box>ファームウェアビルド日時: {timeText}</Box>;
  }
);

const BlankFillerPart = createFC(() => (
  <Center flexDirection="column">
    <IconIconifyZ spec="ph:folder-thin" q={css({ fontSize: "70px" })} />
    <Box textAlign="center">
      ローカルプロジェクトのフォルダを
      <br />
      ドラッグ&ドロップして読み込みます
    </Box>
  </Center>
));

export const LocalProjectPageImpl = createFC<{ loggedIn: boolean }>(
  ({ loggedIn }) => {
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

    return (
      <Stack
        height="100%"
        background="var(--cl-content-background)"
        padding="16px"
        gap="0"
      >
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
        <BuildDateTimePart
          timestamp={project?.assetFirmware.lastModified}
          if={project?.assetFirmware.validity === "valid"}
          q={css({ margin: "0 8px" })}
        />
        <ProjectReadmeArea
          readmeFileContent={project?.assetReadme.fileContent!}
          if={project?.assetReadme.fileContent}
        />
        <BlankFillerPart q={css({ flexGrow: 1 })} if={!project} />
        <FirmwareDownloadButtonArea
          label="UF2ダウンロード"
          handler={submitEditItems}
          if={project}
        />
      </Stack>
    );
  }
);
