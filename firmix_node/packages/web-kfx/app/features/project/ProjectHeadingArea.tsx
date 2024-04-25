import { css } from "@linaria/core";
import { ReactNode } from "@mx/auxiliaries/fe-deps-react";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { useRepositoryDisplayInfo } from "@mx/shared/github/repository_info_helper";
import { projectHeadingArea_parts } from "@mx/web-kfx/app/features/project/ProjectHeadingArea_Parts";
import { flexVertical } from "../../common_styling/utility_styles";

type Props = {
  projectName: string;
  variationName: string;
  repositoryUrl: string;
  tags: string[];
  operationUiAdditional?: ReactNode;
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
  ({
    projectName,
    variationName,
    repositoryUrl,
    tags,
    operationUiAdditional,
    authorInfo,
  }) => {
    const repositoryInfo = useRepositoryDisplayInfo(repositoryUrl);
    const {
      ProjectTitlePart,
      ProjectTagsList,
      RepositoryInfoPart,
      AuthorPart,
    } = projectHeadingArea_parts;
    return (
      <div q={style}>
        <ProjectTitlePart
          projectName={projectName}
          variationName={variationName}
        />
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
