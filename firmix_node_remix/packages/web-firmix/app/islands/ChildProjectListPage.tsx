import { css } from "@linaria/core";
import {
  ProjectDetailDto,
  ProjectListItemDto,
} from "@m/web-firmix/base/types_dto.ts";
import { ProjectListItemCard } from "@m/web-firmix/features/project_list/ProjectListItemCard.tsx";
import { Link } from "@remix-run/react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { flexVertical } from "shared/common/utility_styles.ts";

type Props = {
  project: ProjectDetailDto;
  childProjects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ChildProjectListPage = createFC<Props>(
  ({ project, childProjects, showPublicity }) => {
    const parentPagePath = `/project/${project.projectId}`;
    return (
      <div q={style}>
        <header>
          <Link to={parentPagePath} q="link">
            {project.projectName}
          </Link>
          &nbsp;の派生プロジェクトです。
        </header>
        <div q="list">
          {childProjects.map((project) => (
            <ProjectListItemCard
              key={project.projectId}
              project={project}
              showPublicity={showPublicity}
            />
          ))}
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 16px 0;
  ${flexVertical(16)};

  > header {
    > a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  > .list {
    ${flexVertical(16)};
  }
`;
