import { css } from "@linaria/core";
import { ProjectListItemDto } from "@m/web-firmix/base/types_dto.ts";
import { HomeTargetSelectionBar } from "@m/web-firmix/features/project_list/HomeTargetSelectionBar.tsx";
import { ProjectListItemCard } from "@m/web-firmix/features/project_list/ProjectListItemCard";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { flexVertical } from "shared/common/utility_styles.ts";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
  showHomeTargetSelectionBar: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity, showHomeTargetSelectionBar }) => {
    return (
      <div q={style}>
        <div q="site-instruction">
          自作キーボードや電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
        </div>
        <HomeTargetSelectionBar if={showHomeTargetSelectionBar} />
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
