import { ReactNode } from "@mx/auxiliaries/fe-deps-react";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { useRepositoryDisplayInfo } from "@mx/shared/github/repository_info_helper";
import { projectHeadingArea_parts } from "@mx/web-firmix-nextjs/src/features/project/ProjectHeadingArea_Parts";
import { VStack } from "../../common_styling/utility_components";

type Props = {
  projectName: string;
  variationName: string;
  repositoryUrl: string;
  tags: string[];
  operationUiAdditional?: ReactNode;
  authorInfo?: {
    userName: string;
    userAvatarUrl: string;
  };
};

export const LocalProjectHeadingAreaDummy = createFC(() => {
  return <div>メタデータファイルが存在しないか、内容にエラーがあります。</div>;
});

export const ProjectHeadingArea = createFC<Props>(
  ({
    projectName,
    variationName,
    repositoryUrl,
    tags,
    operationUiAdditional,
    authorInfo,
  }) => {
    const repositoryInfo = useRepositoryDisplayInfo(repositoryUrl);
    const {
      ProjectTitlePart,
      ProjectTagsList,
      RepositoryInfoPart,
      AuthorPart,
    } = projectHeadingArea_parts;
    return (
      <VStack gap="4px" padding="8px" position="relative">
        <ProjectTitlePart
          projectName={projectName}
          variationName={variationName}
        />
        {repositoryInfo && (
          <RepositoryInfoPart
            repositoryInfo={repositoryInfo}
            sx={{ alignSelf: "flex-start" }}
          />
        )}
        {authorInfo && (
          <AuthorPart
            userName={authorInfo.userName}
            avatarUrl={authorInfo.userAvatarUrl}
            sx={{ marginLeft: "2px", marginBottom: "8px" }}
          />
        )}
        {/* <div if={!repositoryInfo} /> */}
        <ProjectTagsList tags={tags} />
        <VStack
          gap="8px"
          position="absolute"
          alignItems="flex-end"
          right={0}
          top={0}
          padding="8px"
        >
          {operationUiAdditional}
        </VStack>
      </VStack>
    );
  }
);
