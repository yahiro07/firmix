import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "web-firmix/app/base/types_dto.ts";
import { ProjectDetailPageImpl } from "web-firmix/app/features/project_detail/ProjectDetailPageImpl.tsx";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  return <ProjectDetailPageImpl project={project} />;
});
