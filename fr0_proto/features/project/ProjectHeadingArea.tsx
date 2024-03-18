import { ComponentChildren } from "preact";
import { css } from "resin";
import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { useRepositoryDisplayInfo } from "~/fe_modules/repository_info_helper.ts";
import { projectHeadingArea_parts } from "~/features/project/ProjectHeadingArea_Parts.tsx";

type Props = {
  projectName: string;
  repositoryUrl: string;
  tags: string[];
  operationUiAdditional?: ComponentChildren;
  authorInfo?: {
    userName: string;
    userAvatarUrl: string;
  };
};

export const LocalProjectHeadingAreaDummy = createFC(() => {
  return (
    <div q={style}>
      メタデータファイルが存在しないか、内容にエラーがあります。
    </div>
  );
});

export const ProjectHeadingArea = createFC<Props>(
  ({ projectName, repositoryUrl, tags, operationUiAdditional, authorInfo }) => {
    const repositoryInfo = useRepositoryDisplayInfo(repositoryUrl);
    const {
      ProjectTitlePart,
      ProjectTagsList,
      RepositoryInfoPart,
      AuthorPart,
    } = projectHeadingArea_parts;
    return (
      <div q={style}>
        <ProjectTitlePart projectName={projectName} />
        {repositoryInfo && (
          <RepositoryInfoPart repositoryInfo={repositoryInfo} />
        )}
        {authorInfo && (
          <AuthorPart
            userName={authorInfo.userName}
            avatarUrl={authorInfo.userAvatarUrl}
            q="author"
          />
        )}
        {/* <div q="repository-info" if={!repositoryInfo} /> */}
        <ProjectTagsList tags={tags} q="tags" />
        <div q="control-area">{operationUiAdditional}</div>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  position: relative;

  ${flexVertical(4)};

  > .control-area {
    position: absolute;
    right: 0;
    top: 0;
    padding: 8px;
    ${flexVertical(16)};
    align-items: flex-end;
  }
  > .author {
    margin-left: 2px;
    margin-bottom: 8px;
  }
`;
