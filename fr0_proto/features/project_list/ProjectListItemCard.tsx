import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { flexHorizontal } from "~/common/utility_styles.ts";

type Props = {
  project: ProjectListItemDto;
};

export const ProjectListItemCard = createFC<Props>(({ project }: Props) => {
  const navigateToDetail = () => {
    location.href = `/project/${project.projectId}`;
  };
  return (
    <div q={style}>
      <div q="head-row">
        <h3>{project.projectName}</h3>
        <button onClick={navigateToDetail}>詳細</button>
      </div>
      <div q="content-row">
        <div q="thumbnail-box">
          <img src={project.thumbnailUrl} />
        </div>
        <div q="introduction">{project.introduction}</div>
      </div>
    </div>
  );
});

const style = css`
  min-height: 100px;
  background: #fff;
  padding: 12px;
  > .head-row {
    ${flexHorizontal()};
    > button {
      margin-left: auto;
      padding: 0 8px;
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