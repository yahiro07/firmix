import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "@mx/web-kfx/app/base/types_dto";
import { ProjectListItemCard } from "@mx/web-kfx/app/features/project_list/ProjectListItemCard";
import { Stack } from "../../styled-system/jsx";
import { HomeTargetSelectionBar } from "../features/project_list/HomeTargetSelectionBar";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
  showHomeTargetSelectionBar: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity, showHomeTargetSelectionBar }) => {
    return (
      <Stack gap={3} padding="16px 0">
        <div q="site-instruction">
          自作キーボードや電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
          <br />
          このバージョン(KFX)では、自作キーボードエコシステムKermiteと連携する機能を搭載する予定です。
        </div>
        <HomeTargetSelectionBar if={showHomeTargetSelectionBar} />
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
