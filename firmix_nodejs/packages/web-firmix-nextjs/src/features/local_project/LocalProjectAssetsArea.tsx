import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import {
  LocalAssetBase,
  LocalAsset_Thumbnail,
  LocalDevelopmentProject,
} from "@mx/web-firmix-nextjs/src/base/types_local_project";
import { createFCE } from "../../common_styling/create_fce";
import { H3, HStack, Img } from "../../common_styling/utility_components";
import { flexAligned } from "../../common_styling/utility_styles";
import { IconIconifyZ } from "../../components/IconIconifyZ";

type Props = {
  project: LocalDevelopmentProject;
};

const local = {
  extractThumbnailInfoAdditional(assetThumbnail: LocalAsset_Thumbnail): string {
    const thumb = assetThumbnail.thumbnailContainer;
    if (thumb) {
      return `(${thumb.width}x${thumb.height})`;
    }
    return "";
  },
};

const ProjectResourceHeader = createFC(() => (
  <H3 sx={flexAligned} gap="0">
    <IconIconifyZ spec="ph:files" sx={{ fontSize: "24px" }} />
    <Box fontSize="20px">プロジェクトリソース</Box>
  </H3>
));

const AssetEntry = createFC<{
  title: string;
  asset: LocalAssetBase;
  infoAdditional?: string;
}>(({ title, asset, infoAdditional }) => {
  const [iconSpec, iconColor] = (
    {
      valid: ["mdi:check", "green"],
      warning: ["mdi:warning-outline", "orange"],
      error: ["subway:error", "red"],
    } as const
  )[asset.validity];

  return (
    <Box>
      <HStack gap="2px">
        <IconIconifyZ spec={iconSpec} sx={{ color: iconColor }} />
        <span>
          {title}: {asset.filePath} {infoAdditional}
        </span>
      </HStack>
      <Box marginLeft="16px">
        {asset.errorLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Box>
    </Box>
  );
});

const ThumbnailBox = createFCE<{ thumbnailUrl: string }>(({ thumbnailUrl }) => (
  <Box width="160px" height="120px">
    <Img
      src={thumbnailUrl}
      alt="thumbnail"
      width="100%"
      height="100%"
      sx={{ objectFit: "contain" }}
    />
  </Box>
));

export const LocalProjectAssetsArea = createFC<Props>(({ project }) => {
  const { assetReadme, assetMetadata, assetThumbnail, assetFirmware } = project;
  const thumbnailInfoAdditional =
    local.extractThumbnailInfoAdditional(assetThumbnail);
  const thumbnailUrl = assetThumbnail.thumbnailContainer?.imageDataUrl;

  return (
    <Box position="relative" padding="8px">
      <ProjectResourceHeader />
      {/* <div>ターゲットMCU:{patchingManifest.targetMcu}</div> */}
      <AssetEntry title="Readmeファイル" asset={assetReadme} />
      <AssetEntry title="メタデータファイル" asset={assetMetadata} />
      <AssetEntry
        title="サムネイル"
        asset={assetThumbnail}
        infoAdditional={thumbnailInfoAdditional}
      />
      <AssetEntry title="ファームウェア" asset={assetFirmware} />
      <ThumbnailBox
        thumbnailUrl={thumbnailUrl!}
        if={thumbnailUrl}
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          margin: "2",
        }}
      />
    </Box>
  );
});
