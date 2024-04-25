import { css } from "@linaria/core";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "web-kfx/app/base/types_dto";
import { HomeTargetSelectionBar } from "web-kfx/app/features/project_list/HomeTargetSelectionBar";
import { ProjectListItemCard } from "web-kfx/app/features/project_list/ProjectListItemCard";
import { flexVertical } from "../common_styling/utility_styles";

type Props = {
  projects: ProjectListItemDto[];
  showPublicity: boolean;
  showHomeTargetSelectionBar: boolean;
};

export const ProjectListPage = createFC<Props>(
  ({ projects, showPublicity, showHomeTargetSelectionBar }) => {
    return (
      <div q={style}>
        <div q="site-instruction">
          自作キーボードや電子工作の作品を投稿して、ファームウェアを配布できるWebサービスです。
          <br />
          このバージョン(KFX)では、自作キーボードエコシステムKermiteと連携する機能を搭載する予定です。
          <br />
          2024/4/13
          大幅な構成変更を予定しており、その際に投稿データをリセットする場合があります。ご了承ください。
        </div>
        <HomeTargetSelectionBar if={showHomeTargetSelectionBar} />
        <div q="list">
          {projects.map((project) => (
            <ProjectListItemCard
              key={project.projectId}
              project={project}
              showPublicity={showPublicity}
            />
          ))}
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 16px 0;
  ${flexVertical(16)};

  > .list {
    ${flexVertical(16)};
  }
`;
