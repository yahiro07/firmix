import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { ProjectDetailDto } from "~/base/types_dto.ts";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectInformationArea = createFC<Props>(({ project }) => {
  return (
    <div q={style}>
      <div>project name: {project.projectName}</div>
      <div>introduction: {project.introduction}</div>
      <div>target mcu: {project.targetMcu}</div>
    </div>
  );
});

const style = css`
  border: solid 1px #888;
  padding: 10px;
  background: #fff;
`;
