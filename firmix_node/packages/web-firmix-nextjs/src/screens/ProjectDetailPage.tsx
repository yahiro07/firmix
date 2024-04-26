"use client";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto } from "../base/types_dto";
import { ProjectDetailPageImpl } from "../features/project_detail/ProjectDetailPageImpl";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  return <ProjectDetailPageImpl project={project} />;
});
