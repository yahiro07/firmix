import { Box, BoxProps, HStack } from "@chakra-ui/react";
import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { FC } from "react";
import { styleTextLinkInheritColor } from "shared/common/common_styles";
import { flexAligned, flexVertical } from "shared/common/utility_styles";
import { Button } from "shared/components/CommonControls";
import { IconIconifyZ } from "shared/components/IconIconifyZ";
import { ProjectRepositoryInfo } from "shared/foreign/types";

const ProjectTitlePart = createFCX<{
  projectName: string;
  variationName: string;
}>(
  ({ projectName, variationName }) => {
    return (
      <div>
        <h2>
          <IconIconifyZ spec="icon-park-twotone:chip" q="title-icon" />
          <span>{projectName}</span>
        </h2>
        <h3 if={variationName}>{variationName}</h3>
      </div>
    );
  },
  css`
    > h2 {
      ${flexAligned(2)};
      font-size: 32px;
      > .title-icon {
        margin-top: 3px;
        font-size: 36px;
      }
    }
    > h3 {
      font-size: 28px;
    }
  `
);

const ProjectTagsList: FC<BoxProps & { tags: string[] }> = ({
  tags,
  ...props
}) => {
  return (
    <HStack gap={2} {...props}>
      {tags.map((tag) => (
        <Box
          key={tag}
          q="tag"
          fontSize="14px"
          background="#bbb"
          padding="0 8px 1px"
          borderRadius="99px"
          color="#fff"
          whiteSpace="nowrap"
        >
          {tag}
        </Box>
      ))}
    </HStack>
  );
};

const RepositoryInfoPart = createFCX<{ repositoryInfo: ProjectRepositoryInfo }>(
  ({ repositoryInfo }) => {
    return (
      <div q="repository-info">
        <a
          href={repositoryInfo.repositoryUrl}
          target="_blank"
          q="repository"
          rel="noreferrer"
        >
          <IconIconifyZ spec="mdi:github" q="github-icon" />
          <span>{repositoryInfo.repositoryProjectPath}</span>
        </a>
      </div>
    );
  },
  css`
    font-size: 18px;
    ${flexVertical(2)};
    align-items: flex-start;
    > .repository {
      > .github-icon {
        font-size: 30px;
        margin-top: 4px;
      }
      ${flexAligned(1)};
    }
    > a {
      ${styleTextLinkInheritColor};
    }
  `
);

const AuthorPart = createFCX<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => {
    return (
      <div>
        <img src={avatarUrl} alt="avatar" />
        <div>{userName}</div>
      </div>
    );
  },
  css`
    font-size: 18px;
    > img {
      width: 26px;
    }
    ${flexAligned(4)};
  `
);

const EditorButton = createFCX<{ active: boolean; onClick(): void }>(
  ({ active, onClick }) => {
    return (
      <Button q={active && "--active"} onClick={onClick}>
        <IconIconifyZ spec="mdi:edit" />
        <span>エディタ</span>
      </Button>
    );
  },
  css`
    ${flexAligned()};
    &.--active {
      background: var(--cl-button-edit-active);
    }
  `
);

export const projectHeadingArea_parts = {
  ProjectTitlePart,
  ProjectTagsList,
  RepositoryInfoPart,
  AuthorPart,
  EditorButton,
};
