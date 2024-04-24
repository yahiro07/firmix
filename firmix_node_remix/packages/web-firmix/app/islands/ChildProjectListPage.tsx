import { Box, Stack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import {
  ProjectDetailDto,
  ProjectListItemDto,
} from "web-firmix/app/base/types_dto";
import { ProjectListItemCard } from "web-firmix/app/features/project_list/ProjectListItemCard";
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
        <header>
          <Box
            as={Link}
            to={parentPagePath}
            q="link"
            sx={styleObj_TextLinkInheritColor}
          >
            {project.projectName}
          </Box>
          &nbsp;の派生プロジェクトです。
        </header>
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
