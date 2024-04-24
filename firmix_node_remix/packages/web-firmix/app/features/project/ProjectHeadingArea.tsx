import { ReactNode } from "auxiliaries/fe-deps-react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { useRepositoryDisplayInfo } from "shared/foreign/repository_info_helper";
import { projectHeadingArea_parts } from "web-firmix/app/features/project/ProjectHeadingArea_Parts";
import { Stack } from "../../../styled-system/jsx";

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
      <Stack gap="1" padding="8px" position="relative">
        <ProjectTitlePart
          projectName={projectName}
          variationName={variationName}
        />
        {repositoryInfo && (
          <RepositoryInfoPart repositoryInfo={repositoryInfo} />
        )}
        {authorInfo && (
          <AuthorPart
            userName={authorInfo.userName}
            avatarUrl={authorInfo.userAvatarUrl}
            marginLeft="2px"
            marginBottom="8px"
          />
        )}
        {/* <div if={!repositoryInfo} /> */}
        <ProjectTagsList tags={tags} />
        <Stack
          gap="4"
          position="absolute"
          alignItems="flex-end"
          right={0}
          top={0}
          padding="8px"
        >
          {operationUiAdditional}
        </Stack>
      </Stack>
    );
  }
);
