import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { ProjectRepositoryInfo } from "shared/foreign/types";
import { styleTextLinkInheritColor } from "../../common_styling/common_styles";
import { flexAligned, flexVertical } from "../../common_styling/utility_styles";
import { Button } from "../../components/CommonControls";
import { IconIconifyZ } from "../../components/IconIconifyZ";

const ProjectTitlePart = createFCX<{
  projectName: string;
  variationName: string;
}>(
  ({ projectName, variationName }) => {
    return (
      <div>
        <h2>
          <IconIconifyZ spec="icon-park-twotone:chip" q="title-icon" />
          <span>{projectName}</span>
        </h2>
        <h3 if={variationName}>{variationName}</h3>
      </div>
    );
  },
  css`
    > h2 {
      ${flexAligned(2)};
      font-size: 32px;
      > .title-icon {
        margin-top: 3px;
        font-size: 36px;
      }
    }
    > h3 {
      font-size: 28px;
    }
  `
);

const ProjectTagsList = createFCX<{ tags: string[] }>(
  ({ tags }) => {
    return (
      <div>
        {tags.map((tag) => (
          <div key={tag} q="tag">
            {tag}
          </div>
        ))}
      </div>
    );
  },
  css`
    ${flexAligned(8)};
    > .tag {
      font-size: 14px;
      padding: 0 8px 1px;
      border-radius: 20px;
      background: #bbb;
      color: #fff;
      white-space: nowrap;
    }
  `
);

const RepositoryInfoPart = createFCX<{ repositoryInfo: ProjectRepositoryInfo }>(
  ({ repositoryInfo }) => {
    return (
      <div q="repository-info">
        <a
          href={repositoryInfo.repositoryUrl}
          target="_blank"
          q="repository"
          rel="noreferrer"
        >
          <IconIconifyZ spec="mdi:github" q="github-icon" />
          <span>{repositoryInfo.repositoryProjectPath}</span>
        </a>
      </div>
    );
  },
  css`
    font-size: 18px;
    ${flexVertical(2)};
    align-items: flex-start;
    > .repository {
      > .github-icon {
        font-size: 30px;
        margin-top: 4px;
      }
      ${flexAligned(1)};
    }
    > a {
      ${styleTextLinkInheritColor};
    }
  `
);

const AuthorPart = createFCX<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => {
    return (
      <div>
        <img src={avatarUrl} alt="avatar" />
        <div>{userName}</div>
      </div>
    );
  },
  css`
    font-size: 18px;
    > img {
      width: 26px;
    }
    ${flexAligned(4)};
  `
);

const EditorButton = createFCX<{ active: boolean; onClick(): void }>(
  ({ active, onClick }) => {
    return (
      <Button q={active && "--active"} onClick={onClick}>
        <IconIconifyZ spec="mdi:edit" />
        <span>エディタ</span>
      </Button>
    );
  },
  css`
    ${flexAligned()};
    &.--active {
      background: var(--cl-button-edit-active);
    }
  `
);

export const projectHeadingArea_parts = {
  ProjectTitlePart,
  ProjectTagsList,
  RepositoryInfoPart,
  AuthorPart,
  EditorButton,
};
