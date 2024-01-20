import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";

type Props = {
  project: ProjectListItemDto;
};

export const ProjectListItemCard = createFC<Props>(({ project }: Props) => {
  return (
    <div q={style}>
      <h2>{project.projectName}</h2>
      <div>
        <img src={project.thumbnailUrl} />
      </div>
    </div>
  );
});

const style = css`
  min-height: 100px;
  background: #fff;
`;
