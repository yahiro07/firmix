import { createFCX, css } from "resin";
import { ProjectRepositoryInfo } from "~/base/types_app_common.ts";
import { styleTextLinkInheritColor } from "~/common/common_styles.ts";
import { colors } from "~/common/ui_theme.ts";
import {
  flexHorizontalAligned,
  flexVertical,
} from "~/common/utility_styles.ts";
import { Button } from "~/components/CommonControls.tsx";
import { IconIconify } from "~/components/IconIconify.tsx";

const ProjectTitlePart = createFCX<{ projectName: string }>(
  ({ projectName }) => {
    return (
      <h2>
        <IconIconify spec="icon-park-twotone:chip" q="title-icon" />
        <span>{projectName}</span>
      </h2>
    );
  },
  css`
    ${flexHorizontalAligned(2)};
    font-size: 32px;
    > .title-icon {
      margin-top: 3px;
      font-size: 36px;
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
    ${flexHorizontalAligned(8)};
    > .tag {
      font-size: 14px;
      padding: 0 8px 1px;
      border-radius: 20px;
      background: #bbb;
      color: #fff;
    }
  `
);

const RepositoryInfoPart = createFCX<{ repositoryInfo: ProjectRepositoryInfo }>(
  ({ repositoryInfo }) => {
    return (
      <div q="repository-info">
        <a href={repositoryInfo.repositoryUrl} target="_blank" q="repository">
          <IconIconify spec="mdi:github" q="github-icon" />
          <span>{repositoryInfo.repositoryProjectPath}</span>
        </a>
        <div q="author">
          <img src={repositoryInfo.ownerIconUrl} />
          <div>{repositoryInfo.ownerName}</div>
        </div>
      </div>
    );
  },
  css`
    font-size: 16px;
    ${flexVertical(2)};
    align-items: flex-start;
    > .repository {
      > .github-icon {
        font-size: 22px;
      }
      ${flexHorizontalAligned(1)};
    }
    > .author {
      margin-left: 2px;

      > img {
        width: 18px;
      }
      ${flexHorizontalAligned(4)};
    }
    > a {
      ${styleTextLinkInheritColor};
    }
  `
);

const EditorButton = createFCX<{ active: boolean; onClick(): void }>(
  ({ active, onClick }) => {
    return (
      <Button q={active && "--active"} onClick={onClick}>
        <IconIconify spec="mdi:edit" />
        <span>エディタ</span>
      </Button>
    );
  },
  css`
    ${flexHorizontalAligned()};
    &.--active {
      background: ${colors.buttonEditActive};
    }
  `
);

export const projectHeadingArea_parts = {
  ProjectTitlePart,
  ProjectTagsList,
  RepositoryInfoPart,
  EditorButton,
};
