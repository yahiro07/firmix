import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "@mx/web-firmix/app/base/types_dto";
import { ProjectDetailPageImpl } from "@mx/web-firmix/app/features/project_detail/ProjectDetailPageImpl";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  return <ProjectDetailPageImpl project={project} />;
});
