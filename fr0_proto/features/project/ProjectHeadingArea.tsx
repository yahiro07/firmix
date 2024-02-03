import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectTab } from "~/base/types_app_common.ts";
import { styleTextLinkInheritColor } from "~/common/common_styles.ts";
import { colors } from "~/common/ui_theme.ts";
import {
  flexHorizontalAligned,
  flexVertical,
} from "~/common/utility_styles.ts";
import { Button } from "~/components/CommonControls.tsx";
import { IconIconify } from "~/components/IconIconify.tsx";
import { useRepositoryDisplayInfo } from "~/fe_modules/repository_info_helper.ts";

type Props = {
  projectName: string;
  repositoryUrl: string;
  tags: string[];
  projectTab: ProjectTab;
  setProjectTab(tab: ProjectTab): void;
};

export const LocalProjectHeadingAreaDummy = createFC(() => {
  return (
    <div q={style}>
      メタデータファイルが存在しないか、内容にエラーがあります。
    </div>
  );
});

export const ProjectHeadingArea = createFC<Props>(
  ({ projectName, repositoryUrl, tags, projectTab, setProjectTab }) => {
    const repositoryInfo = useRepositoryDisplayInfo(repositoryUrl);
    const toggleProjectTab = () => {
      const nextTab = projectTab === "editor" ? "info" : "editor";
      setProjectTab(nextTab);
    };
    return (
      <div q={style}>
        <h2>
          <IconIconify spec="icon-park-twotone:chip" q="icon" />
          <span>{projectName}</span>
        </h2>
        {repositoryInfo && (
          <div q="repository-info">
            <a
              href={repositoryInfo.repositoryUrl}
              target="_blank"
              q="repository"
            >
              <IconIconify spec="mdi:github" q="icon" />
              <span>
                {repositoryInfo.ownerName}/{repositoryInfo.repositoryName}
              </span>
            </a>
            <div q="author">
              <img src={repositoryInfo.ownerIconUrl} />
              <div>{repositoryInfo.ownerName}</div>
            </div>
          </div>
        )}
        <div q="repository-info" if={!repositoryInfo} />
        <div q="tags">
          {tags.map((tag) => (
            <div key={tag} q="tag">
              {tag}
            </div>
          ))}
        </div>
        <div q="control-area">
          <Button
            q={["btn-edit", projectTab === "editor" && "--active"]}
            onClick={toggleProjectTab}
          >
            <IconIconify spec="mdi:edit" />
            <span>エディタ</span>
          </Button>
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  position: relative;

  ${flexVertical(8)};

  > h2 {
    ${flexHorizontalAligned(2)};
    > .icon {
      font-size: 28px;
    }
  }

  > .repository-info {
    font-size: 16px;
    ${flexVertical(2)};
    align-items: flex-start;
    > .repository {
      > .icon {
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
  }

  > .tags {
    ${flexHorizontalAligned(8)};
    > .tag {
      font-size: 14px;
      padding: 0 8px 1px;
      border-radius: 20px;
      background: #aaa;
      color: #fff;
    }
  }

  > .control-area {
    position: absolute;
    right: 0;
    top: 0;
    padding: 8px;
    > .btn-edit {
      ${flexHorizontalAligned()};
      &.--active {
        background: ${colors.buttonEditActive};
      }
    }
  }
`;
