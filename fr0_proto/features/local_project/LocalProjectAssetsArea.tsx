import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";
import { flexHorizontalAligned } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

type Props = {
  project: LocalDevelopmentProject;
};

export const LocalProjectAssetsArea = createFC<Props>(({ project }) => {
  const {
    patchingManifest,
    assetFilePaths,
    thumbnailImageContainer: thumb,
  } = project;
  const imageSizeText = `${thumb.width}x${thumb.height}`;
  return (
    <div q={style}>
      <h3>
        <IconIconify spec="ph:files" q="icon" />
        <span>プロジェクトリソース</span>
      </h3>
      {/* <div>ターゲットMCU:{patchingManifest.targetMcu}</div> */}
      <div>Readmeファイル: {assetFilePaths.readme}</div>
      <div>メタデータファイル: {assetFilePaths.metadata}</div>
      <div>
        サムネイルファイル: {assetFilePaths.thumbnail} ({imageSizeText})
      </div>
      <div>ファームウェア: {assetFilePaths.firmware}</div>
      <div if={assetFilePaths.modFirmware}>
        パッチ適用済ファームウェア: {assetFilePaths.modFirmware}
      </div>
      <div q="thumbnail-box">
        <img src={project.thumbnailImageContainer.imageDataUrl} />
      </div>
    </div>
  );
});

const style = css`
  padding: 8px;
  position: relative;

  > h3 {
    ${flexHorizontalAligned()};
    > .icon {
      font-size: 24px;
    }
  }
  > .thumbnail-box {
    position: absolute;
    right: 0;
    top: 0;
    margin: 8px;
    width: 160px;
    height: 120px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
