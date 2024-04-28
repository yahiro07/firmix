"use client";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "@mx/web-firmix-nextjs/src/base/types_dto";
import { ProjectListItemCard } from "@mx/web-firmix-nextjs/src/features/project_list/ProjectListItemCard";
import { VStack } from "../common_styling/utility_components";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity }) => {
    return (
      <VStack gap="12px" padding="16px 0">
        <div>
          電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
        </div>
        <VStack gap="16px">
          {projects.map((project) => (
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
