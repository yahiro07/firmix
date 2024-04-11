import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "~/base/types_dto.ts";
import { ProjectDetailPageImpl } from "~/features/project_detail/ProjectDetailPageImpl.tsx";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  return <ProjectDetailPageImpl project={project} />;
});
