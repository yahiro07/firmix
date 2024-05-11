import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import {
  ProjectDetailDto,
  ProjectListItemDto,
} from "@mx/web-kfx/app/base/types_dto";
import { ProjectListItemCard } from "@mx/web-kfx/app/features/project_list/ProjectListItemCard";
import { Link } from "@remix-run/react";
import { Box, HStack, Stack } from "../../styled-system/jsx";
import { styleObj_TextLinkInheritColor } from "../common_styling/common_styles";

type Props = {
  project: ProjectDetailDto;
  childProjects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ChildProjectListPage = createFC<Props>(
  ({ project, childProjects, showPublicity }) => {
    const parentPagePath = `/project/${project.projectId}`;
    return (
      <Stack gap={3} padding="16px 0">
        <HStack gap={0}>
          <Link to={parentPagePath}>
            <Box {...styleObj_TextLinkInheritColor}>{project.projectName}</Box>
          </Link>
          &nbsp;の派生プロジェクトです。
        </HStack>
        <Stack gap={4}>
          {childProjects.map((project) => (
            <ProjectListItemCard
              key={project.projectId}
              project={project}
              showPublicity={showPublicity}
            />
          ))}
        </Stack>
      </Stack>
    );
  }
);
