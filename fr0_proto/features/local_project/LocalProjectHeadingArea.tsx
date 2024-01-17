import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectTab } from "~/base/types_app_common.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";
import { useRepositoryDisplayInfo } from "~/common/repository_info_helper.ts";
import {
  flexHorizontalAligned,
  flexVertical,
} from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

type Props = {
  project: LocalDevelopmentProject;
  projectTab: ProjectTab;
  setProjectTab(tab: ProjectTab): void;
};

export const LocalProjectHeadingArea = createFC<Props>(
  ({ project, projectTab, setProjectTab }) => {
    const repositoryInfo = useRepositoryDisplayInfo(
      project.metadataInput.sourceCodeUrl
    );

    const toggleProjectTab = () => {
      const nextTab = projectTab === "editor" ? "info" : "editor";
      setProjectTab(nextTab);
    };
    return (
      <div q={style}>
        <h2>
          <IconIconify spec="icon-park-twotone:chip" q="icon" />
          <span>{project.metadataInput.projectName}</span>
        </h2>
        {repositoryInfo && (
          <div q="repository-info">
            <a
              href={repositoryInfo.sourceCodeUrl}
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
          {project.metadataInput.tags.map((tag) => (
            <div key={tag} q="tag">
              {tag}
            </div>
          ))}
        </div>
        <div q="control-area">
          <button
            q={["btn-edit", projectTab === "editor" && "--active"]}
            onClick={toggleProjectTab}
          >
            <IconIconify spec="mdi:edit" />
            <span>エディタ</span>
          </button>
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 8px;
  position: relative;

  > h2 {
    ${flexHorizontalAligned(2)};
    > .icon {
      font-size: 28px;
    }
  }

  > .repository-info {
    margin-top: 4px;
    font-size: 16px;
    min-height: 70px;
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
      padding: 6px 11px;
      font-size: 15px;
      overflow: hidden;
      border: solid 1px #888;
      border-radius: 3px;
      &.--active {
        background: #8ce;
      }
    }
  }
`;
