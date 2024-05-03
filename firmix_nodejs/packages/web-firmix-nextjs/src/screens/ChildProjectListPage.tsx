"use client";
import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectDetailDto, ProjectListItemDto } from "../base/types_dto";
import { styleObj_TextLinkInheritColor } from "../common_styling/common_styles";
import {
  HStack,
  StyledLink,
  VStack,
} from "../common_styling/utility_components";
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
      <VStack gap="12px" padding="16px 0">
        <HStack gap={0}>
          <StyledLink href={parentPagePath}>
            <Box {...styleObj_TextLinkInheritColor}>{project.projectName}</Box>
          </StyledLink>
          &nbsp;の派生プロジェクトです。
        </HStack>
        <VStack gap="16px">
          {childProjects.map((project) => (
            <ProjectListItemCard
              key={project.projectId}
              project={project}
              showPublicity={showPublicity}
            />
          ))}
        </VStack>
      </VStack>
    );
  }
);
