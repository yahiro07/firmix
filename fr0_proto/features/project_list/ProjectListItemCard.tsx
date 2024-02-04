import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { flexHorizontal } from "~/common/utility_styles.ts";
import { Button, Card } from "~/components/CommonControls.tsx";

type Props = {
  project: ProjectListItemDto;
};

export const ProjectListItemCard = createFC<Props>(({ project }: Props) => {
  const navigateToDetail = () => {
    location.href = `/project/${project.projectId}`;
  };
  return (
    <Card q={style}>
      <div q="head-row">
        <h3>{project.projectName}</h3>
        <Button onClick={navigateToDetail}>詳細</Button>
      </div>
      <div q="content-row">
        <div q="thumbnail-box">
          <img src={project.thumbnailUrl} />
        </div>
        <div q="introduction">
          <p>{project.introduction}</p>
          <p if={false}>
            公開状態: {project.published ? "公開中" : "ドラフト"}
          </p>
        </div>
      </div>
    </Card>
  );
});

const style = css`
  min-height: 100px;
  padding: 16px;
  > .head-row {
    ${flexHorizontal()};
    align-items: flex-start;
    > h3 {
      font-size: 24px;
    }
    > button {
      margin-left: auto;
    }
  }
  > .content-row {
    ${flexHorizontal(8)};
    > .thumbnail-box {
      width: 160px;
      height: 120px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    > .introduction {
      white-space: pre;
    }
  }
`;
