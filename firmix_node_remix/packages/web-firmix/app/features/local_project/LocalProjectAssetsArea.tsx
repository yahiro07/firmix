import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { flexAligned } from "shared/common/utility_styles.ts";
import { IconIconifyZ } from "shared/components/IconIconifyZ.tsx";
import {
  LocalAssetBase,
  LocalAsset_Thumbnail,
  LocalDevelopmentProject,
} from "web-firmix/app/base/types_local_project.ts";

type Props = {
  project: LocalDevelopmentProject;
};

const AssetEntry = createFCX<{
  title: string;
  asset: LocalAssetBase;
  infoAdditional?: string;
}>(
  ({ title, asset, infoAdditional }) => {
    const iconSpec = (
      {
        valid: "mdi:check",
        warning: "mdi:warning-outline",
        error: "subway:error",
      } as const
    )[asset.validity];

    return (
      <div>
        <div q="ae-heading">
          <IconIconifyZ
            spec={iconSpec}
            q={["validity-icon", `--validity-${asset.validity}`]}
          />
          <span>
            {title}: {asset.filePath} {infoAdditional}
          </span>
        </div>
        <div q="errors">
          {asset.errorLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    );
  },
  css`
    > .ae-heading {
      ${flexAligned(2)};

      > .validity-icon {
        &.--validity-valid {
          color: green;
        }
        &.--validity-warning {
          color: orange;
        }
        &.--validity-error {
          color: red;
        }
      }
    }
    > .errors {
      margin-left: 16px;
    }
  `
);

const local = {
  extractThumbnailInfoAdditional(assetThumbnail: LocalAsset_Thumbnail): string {
    const thumb = assetThumbnail.thumbnailContainer;
    if (thumb) {
      return `(${thumb.width}x${thumb.height})`;
    }
    return "";
  },
};

export const LocalProjectAssetsArea = createFCX<Props>(
  ({ project }) => {
    const {
      assetReadme,
      assetMetadata,
      assetThumbnail,
      assetFirmware,
      modFirmwareFilePath,
    } = project;
    const thumbnailInfoAdditional =
      local.extractThumbnailInfoAdditional(assetThumbnail);
    const thumbnailUrl = assetThumbnail.thumbnailContainer?.imageDataUrl;

    return (
      <div>
        <h3>
          <IconIconifyZ spec="ph:files" q="icon" />
          <span>プロジェクトリソース</span>
        </h3>
        {/* <div>ターゲットMCU:{patchingManifest.targetMcu}</div> */}
        <AssetEntry title="Readmeファイル" asset={assetReadme} />
        <AssetEntry title="メタデータファイル" asset={assetMetadata} />
        <AssetEntry
          title="サムネイル"
          asset={assetThumbnail}
          infoAdditional={thumbnailInfoAdditional}
        />
        <AssetEntry title="ファームウェア" asset={assetFirmware} />
        <div if={modFirmwareFilePath}>
          パッチ適用済ファームウェア: {modFirmwareFilePath}
        </div>
        <div q="thumbnail-box" if={thumbnailUrl}>
          <img src={thumbnailUrl} alt="thumbnail" />
        </div>
      </div>
    );
  },
  css`
    padding: 8px;
    position: relative;

    > h3 {
      ${flexAligned()};
      font-size: 20px;
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
  `
);
