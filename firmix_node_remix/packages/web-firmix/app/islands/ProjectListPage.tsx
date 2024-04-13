import { css } from "@linaria/core";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { flexVertical } from "shared/common/utility_styles";
import { ProjectListItemDto } from "web-firmix/app/base/types_dto";
import { ProjectListItemCard } from "web-firmix/app/features/project_list/ProjectListItemCard";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity }) => {
    return (
      <div q={style}>
        <div q="site-instruction">
          電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
        </div>
        <div q="list">
          {projects.map((project) => (
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

  > .list {
    ${flexVertical(16)};
  }
`;
