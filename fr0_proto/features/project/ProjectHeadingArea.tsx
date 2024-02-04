import { ComponentChildren } from "preact";
import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectTab } from "~/base/types_app_common.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { useRepositoryDisplayInfo } from "~/fe_modules/repository_info_helper.ts";
import { projectHeadingArea_parts } from "~/features/project/ProjectHeadingArea_Parts.tsx";

type Props = {
  projectName: string;
  repositoryUrl: string;
  tags: string[];
  projectTab: ProjectTab;
  setProjectTab(tab: ProjectTab): void;
  operationUiAdditional?: ComponentChildren;
};

export const LocalProjectHeadingAreaDummy = createFC(() => {
  return (
    <div q={style}>
      メタデータファイルが存在しないか、内容にエラーがあります。
    </div>
  );
});

export const ProjectHeadingArea = createFC<Props>(
  ({
    projectName,
    repositoryUrl,
    tags,
    projectTab,
    setProjectTab,
    operationUiAdditional,
  }) => {
    const repositoryInfo = useRepositoryDisplayInfo(repositoryUrl);
    const toggleProjectTab = () => {
      const nextTab = projectTab === "editor" ? "info" : "editor";
      setProjectTab(nextTab);
    };
    const {
      ProjectTitlePart,
      ProjectTagsList,
      RepositoryInfoPart,
      EditorButton,
    } = projectHeadingArea_parts;
    return (
      <div q={style}>
        <ProjectTitlePart projectName={projectName} />
        {repositoryInfo && (
          <RepositoryInfoPart repositoryInfo={repositoryInfo} />
        )}
        {/* <div q="repository-info" if={!repositoryInfo} /> */}
        <ProjectTagsList tags={tags} />
        <div q="control-area">
          <EditorButton
            active={projectTab === "editor"}
            onClick={toggleProjectTab}
          />
          {operationUiAdditional}
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  position: relative;

  ${flexVertical(8)};

  > .control-area {
    position: absolute;
    right: 0;
    top: 0;
    padding: 8px;
    ${flexVertical(16)};
    align-items: flex-end;
  }
`;
