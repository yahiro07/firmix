import { Stack } from "@chakra-ui/react";
import { createFCE2 } from "auxiliaries/utils_fe_react/create_fce";
import { ProjectListItemDto } from "web-firmix/app/base/types_dto";
import { ProjectListItemCard } from "web-firmix/app/features/project_list/ProjectListItemCard";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ProjectListPage = createFCE2<Props>(
  ({ projects, showPublicity }) => {
    return (
      <Stack gap={3} padding="16px 0">
        <div q="site-instruction">
          電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
        </div>
        <Stack gap={4}>
          {projects.map((project) => (
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
