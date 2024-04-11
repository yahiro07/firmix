import { ProjectDetailDto } from "@m/web-firmix/base/types_dto.ts";
import { ProjectDetailPageImpl } from "@m/web-firmix/features/project_detail/ProjectDetailPageImpl.tsx";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  return <ProjectDetailPageImpl project={project} />;
});
