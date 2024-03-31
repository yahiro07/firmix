import { css } from "resin";
import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { ProjectListItemCard } from "~/features/project_list/ProjectListItemCard.tsx";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity }) => {
    return (
      <div q={style}>
        <div q="site-instruction">
          自作キーボードや電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
        </div>
        <div q="list">
          {projects.map((project) => (
            <ProjectListItemCard
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
