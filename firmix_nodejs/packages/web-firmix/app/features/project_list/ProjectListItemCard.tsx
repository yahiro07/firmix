import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectListItemDto } from "@mx/web-firmix/app/base/types_dto";
import { LinkChildProjectListPage } from "@mx/web-firmix/app/features/project/project_common_parts";
import { projectHeadingArea_parts } from "@mx/web-firmix/app/features/project/ProjectHeadingArea_Parts";
import { css } from "../../../styled-system/css";
import { Box, Flex, HStack, Spacer, Stack } from "../../../styled-system/jsx";
import { prefab } from "../../common_styling/prefab";
import { H3, H4, Img } from "../../common_styling/utility_components";
import { Card, LinkButton } from "../../components/CommonControls";

type Props = {
  project: ProjectListItemDto;
  showPublicity: boolean;
};

const ThumbnailBox = createFC<{ imageUrl: string }>(({ imageUrl }) => (
  <Box width="200px" aspectRatio={1.3333}>
    <Img
      src={imageUrl}
      alt="thumbnail"
      width="100%"
      height="100%"
      objectFit="cover"
    />
  </Box>
));

const ProjectNameLabel = prefab(<H3 fontSize="22px" />);

const VariationNameLabel = prefab(<H4 fontSize="18px" />);

const AuthorInfo = createFC<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => (
    <HStack gap={1}>
      <Img src={avatarUrl} alt="avatar" width="24px" />
      <span>{userName}</span>
    </HStack>
  )
);

const PublicityLabel = createFC<{ published: boolean }>(({ published }) => (
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
        <Flex gap={4}>
          <ThumbnailBox
            imageUrl={project.thumbnailUrl}
            q={css({ alignSelf: "flex-start", flexShrink: 0 })}
          />
          <Stack flexGrow={1} gap={1}>
            <HStack gap={5} alignItems="flex-start">
              <ProjectNameLabel
                marginTop="-4px"
                children={project.projectName}
              />
              <Spacer />
              <PublicityLabel
                if={showPublicity}
                published={project.published}
                q={css({ flexShrink: 0 })}
              />
              <LinkButton
                to={detailPagePath}
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
              q={css({ marginLeft: "3px" })}
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
          </Stack>
        </Flex>
      </Card>
    );
  }
);
