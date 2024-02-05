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
        {projects.map((project) => (
          <ProjectListItemCard
            project={project}
            showPublicity={showPublicity}
          />
        ))}
      </div>
    );
  }
);

const style = css`
  padding: 16px 0;
  ${flexVertical(16)};
`;
