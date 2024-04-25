import { ProjectListItemDto } from "@mx/web-firmix-nextjs/src/base/types_dto";
import { ProjectListItemCard } from "@mx/web-firmix-nextjs/src/features/project_list/ProjectListItemCard";
import { Stack } from "../../styled-system/jsx";
import { createFCE } from "../common_styling/create_fce";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ProjectListPage = createFCE<Props>(
  ({ projects, showPublicity }) => {
    return (
      <Stack gap={3} padding="16px 0">
        <div>
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
