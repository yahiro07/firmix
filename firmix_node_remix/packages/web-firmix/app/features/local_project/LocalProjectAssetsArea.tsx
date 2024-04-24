import { createFCX } from "auxiliaries/utils_fe_react/fcx";

import { Box, HStack, Img } from "@chakra-ui/react";
import {
  LocalAssetBase,
  LocalAsset_Thumbnail,
  LocalDevelopmentProject,
} from "web-firmix/app/base/types_local_project";
import { createFCE2 } from "../../common_styling/create_fce";
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

const ProjectResourceHeader = createFCE2(() => (
  <HStack as="h3" gap="0">
    <IconIconifyZ spec="ph:files" fontSize="24px" />
    <Box fontSize="20px">プロジェクトリソース</Box>
  </HStack>
));

const AssetEntry = createFCX<{
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
    <div>
      <HStack gap="2px">
        <IconIconifyZ spec={iconSpec} color={iconColor} />
        <span>
          {title}: {asset.filePath} {infoAdditional}
        </span>
      </HStack>
      <Box marginLeft="16px">
        {asset.errorLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Box>
    </div>
  );
});

const ThumbnailBox = createFCE2<{ thumbnailUrl: string }>(
  ({ thumbnailUrl }) => (
    <Box width="160px" height="120px">
      <Img
        src={thumbnailUrl}
        alt="thumbnail"
        width="100%"
        height="100%"
        objectFit="contain"
      />
    </Box>
  )
);

export const LocalProjectAssetsArea = createFCX<Props>(({ project }) => {
  const { assetReadme, assetMetadata, assetThumbnail, assetFirmware } = project;
  const thumbnailInfoAdditional =
    local.extractThumbnailInfoAdditional(assetThumbnail);
  const thumbnailUrl = assetThumbnail.thumbnailContainer?.imageDataUrl;

  return (
    <Box position="relative" padding={2}>
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
        position="absolute"
        top="0"
        right="0"
        margin="2"
      />
    </Box>
  );
});
