import { css } from "@acab/ecsstatic";
import { createFC } from "~/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { HomeTargetSelectionBar } from "~/features/project_list/HomeTargetSelectionBar.tsx";
import { ProjectListItemCard } from "~/features/project_list/ProjectListItemCard";

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
