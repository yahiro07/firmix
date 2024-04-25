import { css } from "@linaria/core";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "@mx/web-kfx/app/base/types_dto";
import { LinkChildProjectListPage } from "@mx/web-kfx/app/features/project/project_common_parts";
import { projectHeadingArea_parts } from "@mx/web-kfx/app/features/project/ProjectHeadingArea_Parts";
import {
  flexAligned,
  flexHorizontal,
  flexVertical,
} from "../../common_styling/utility_styles";
import { Card, LinkButton } from "../../components/CommonControls";

type Props = {
  project: ProjectListItemDto;
  showPublicity: boolean;
};

export const ProjectListItemCard = createFC<Props>(
  ({ project, showPublicity }) => {
    const { ProjectTagsList } = projectHeadingArea_parts;
    const detailPagePath = `/project/${project.projectId}`;
    return (
      <Card q={style}>
        <div q="content-row">
          <div q="thumbnail-box">
            <img src={project.thumbnailUrl} alt="thumbnail" />
          </div>
          <div q="introduction">
            <div q="head-row">
              <h3>{project.projectName}</h3>
              <p
                if={showPublicity}
                q={["publicity", project.published && "--active"]}
              >
                {project.published ? "公開中" : "ドラフト"}
              </p>
              <LinkButton to={detailPagePath} q="button-to-detail">
                詳細
              </LinkButton>
            </div>
            <h4 if={project.variationName}>{project.variationName}</h4>

            <div>{project.introduction}</div>
            <LinkChildProjectListPage
              project={project}
              q="link-derived"
              if={project.numChildProjects > 0}
              smaller
            />

            <div q="foot-row">
              <div q="author">
                <img src={project.userAvatarUrl} alt="avatar" />
                <span>{project.userName}</span>
              </div>
              <ProjectTagsList tags={project.tags} q="tags" />
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

const style = css`
  min-height: 100px;
  padding: 20px;
  /* ${flexVertical(12)}; */

  > .content-row {
    ${flexHorizontal(16)};
    > .thumbnail-box {
      align-self: flex-start;
      flex-shrink: 0;
      width: 200px;
      aspect-ratio: 1.3333;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    > .introduction {
      flex-grow: 1;
      white-space: pre-wrap;
      ${flexVertical(4)};

      > .head-row {
        position: relative;
        ${flexAligned()};

        > h3 {
          margin-top: -4px;
          font-size: 22px;
        }

        > .publicity {
          flex-shrink: 0;
          font-size: 15px;
          margin-left: auto;
          margin-right: 100px;
          color: #888;
          &.--active {
            color: #7ca;
          }
        }

        > .button-to-detail {
          position: absolute;
          top: 0;
          right: 0;
          flex-shrink: 0;
          margin-left: auto;
        }
      }

      > h4 {
        font-size: 18px;
      }

      > .link-derived {
        align-self: flex-start;
        margin-top: 4px;
      }

      > .foot-row {
        margin-top: auto;
        ${flexAligned(16)};

        > .author {
          ${flexAligned(4)}
          > img {
            width: 24px;
          }
        }

        > .tags {
          margin-left: auto;
        }
      }
    }
  }
`;
