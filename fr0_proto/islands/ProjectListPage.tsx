import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { ProjectListItemCard } from "../features/project_list/ProjectListItemCard.tsx";

type Props = {
  projects: ProjectListItemDto[];
};

export const ProjectListPage = createFC<Props>(({ projects }: Props) => {
  return (
    <div q={style}>
      {projects.map((project) => (
        <ProjectListItemCard project={project} />
      ))}
    </div>
  );
});

const style = css`
  ${flexVertical(16)};
`;
