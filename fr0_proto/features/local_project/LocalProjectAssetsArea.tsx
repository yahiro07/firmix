import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";

type Props = {
  project: LocalDevelopmentProject;
};

export const LocalProjectAssetsArea = createFC<Props>(({ project }) => {
  const { patchingManifest, assetFilePaths } = project;
  return (
    <div>
      <div>ターゲットMCU:{patchingManifest.targetMcu}</div>
      <div>メタデータファイル: {assetFilePaths.metadata}</div>
      <div>サムネイルファイル: {assetFilePaths.thumbnail}</div>
      <div>Readmeファイル: {assetFilePaths.readme}</div>
      <div>ファームウェア: {assetFilePaths.firmware}</div>
      <div if={assetFilePaths.modFirmware}>
        パッチ適用済ファームウェア: {assetFilePaths.modFirmware}
      </div>
      <img src={project.thumbnailImageContainer.imageDataUrl} />
    </div>
  );
});
