import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "@mx/web-firmix-nextjs/src/base/types_dto";
import { LinkChildProjectListPage } from "@mx/web-firmix-nextjs/src/features/project/project_common_parts";
import { projectHeadingArea_parts } from "@mx/web-firmix-nextjs/src/features/project/ProjectHeadingArea_Parts";
import { createFCE } from "../../common_styling/create_fce";
import { prefab } from "../../common_styling/prefab";
import {
  Flex,
  H3,
  H4,
  HStack,
  Img,
  Spacer,
  VStack,
} from "../../common_styling/utility_components";
import { Card, LinkButton } from "../../components/CommonControls";

type Props = {
  project: ProjectListItemDto;
  showPublicity: boolean;
};

const ThumbnailBox = createFCE<{ imageUrl: string }>(({ imageUrl }) => (
  <Box width="200px" sx={{ aspectRatio: 1.3333 }}>
    <Img
      src={imageUrl}
      alt="thumbnail"
      width="100%"
      height="100%"
      sx={{
        objectFit: "cover",
      }}
    />
  </Box>
));

const ProjectNameLabel = prefab(<H3 fontSize="22px" />);

const VariationNameLabel = prefab(<H4 fontSize="18px" />);

const AuthorInfo = createFCE<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => (
    <HStack gap="4px">
      <Img src={avatarUrl} alt="avatar" width="24px" />
      <span>{userName}</span>
    </HStack>
  )
);

const PublicityLabel = createFCE<{ published: boolean }>(({ published }) => (
  <Box fontSize="15px" color={published ? "#7ca" : "#888"}>
    {published ? "公開中" : "ドラフト"}
  </Box>
));

export const ProjectListItemCard = createFC<Props>(
  ({ project, showPublicity }) => {
    const { ProjectTagsList } = projectHeadingArea_parts;
    const detailPagePath = `/project/${project.projectId}`;
    return (
      <Card padding="20px" minHeight="100px">
        <Flex gap="16px">
          <ThumbnailBox
            imageUrl={project.thumbnailUrl}
            sx={{
              alignSelf: "flex-start",
              flexShrink: 0,
            }}
          />
          <VStack flexGrow={1} gap="4px">
            <HStack gap="20px" alignItems="flex-start">
              <ProjectNameLabel
                marginTop="-4px"
                children={project.projectName}
              />
              <Spacer />
              <PublicityLabel
                if={showPublicity}
                published={project.published}
                sx={{ flexShrink: 0 }}
              />
              <LinkButton
                href={detailPagePath}
                marginBottom="-16px"
                children="詳細"
              />
            </HStack>
            <VariationNameLabel
              if={project.variationName}
              children={project.variationName}
            />
            <Box whiteSpace="pre-wrap" children={project.introduction} />
            <LinkChildProjectListPage
              project={project}
              if={project.numChildProjects > 0}
              smaller
              sx={{ marginLeft: "3px", alignSelf: "flex-start" }}
            />
            <Spacer />
            <HStack alignItems="flex-end">
              <AuthorInfo
                userName={project.userName}
                avatarUrl={project.userAvatarUrl}
              />
              <Spacer />
              <ProjectTagsList tags={project.tags} />
            </HStack>
          </VStack>
        </Flex>
      </Card>
    );
  }
);
