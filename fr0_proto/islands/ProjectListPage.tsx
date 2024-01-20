import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { ProjectListItemCard } from "../features/project_list/ProjectListItemCard.tsx";

type Props = {
  projects: ProjectListItemDto[];
};

export const ProjectListPage = createFC<Props>(({ projects }: Props) => {
  return (
    <div>
      {projects.map((project) => (
        <ProjectListItemCard project={project} />
      ))}
    </div>
  );
});
