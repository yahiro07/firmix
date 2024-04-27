"use client";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { Box, HStack, Stack } from "../../styled-system/jsx";
import { ProjectDetailDto, ProjectListItemDto } from "../base/types_dto";
import { styleObj_TextLinkInheritColor } from "../common_styling/common_styles";
import { StyledLink } from "../common_styling/utility_components";
import { ProjectListItemCard } from "../features/project_list/ProjectListItemCard";

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
          <StyledLink href={parentPagePath}>
            <Box {...styleObj_TextLinkInheritColor}>{project.projectName}</Box>
          </StyledLink>
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
