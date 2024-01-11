import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentProject } from "~/cathedral/firmix_presenter/types.ts";

type Props = {
  project: LocalDevelopmentProject;
};

export const LocalProjectAssetsArea = createFC<Props>(({ project }) => {
  return (
    <div>
      <div>ターゲットMCU:{project.patchingManifest.targetMcu}</div>
      <div>メタデータ: {project.assetFilePaths.metadata}</div>
      <div>ファームウェア: {project.assetFilePaths.firmware}</div>
    </div>
  );
});
