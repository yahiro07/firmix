import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ProjectRepositoryInfo } from "@mx/shared/github/types_github";
import { FC } from "react";
import { css } from "../../../styled-system/css";
import { Box, BoxProps, HStack } from "../../../styled-system/jsx";
import { styleObj_TextLinkInheritColor } from "../../common_styling/common_styles";
import { H2, H3, Img, StyledA } from "../../common_styling/utility_components";
import { flexAligned } from "../../common_styling/utility_styles";
import { Button } from "../../components/CommonControls";
import { IconIconifyZ } from "../../components/IconIconifyZ";

const ProjectTitlePart = createFC<{
  projectName: string;
  variationName: string;
}>(({ projectName, variationName }) => {
  return (
    <Box>
      <H2 css={flexAligned} gap="2px" fontSize="32px">
        <IconIconifyZ
          spec="icon-park-twotone:chip"
          q={css({ fontSize: "36px", marginTop: "3px" })}
        />
        <span>{projectName}</span>
      </H2>
      <H3 fontSize="28px" if={variationName}>
        {variationName}
      </H3>
    </Box>
  );
});

const ProjectTagsList: FC<BoxProps & { tags: string[] }> = ({
  tags,
  ...props
}) => {
  return (
    <HStack gap={2} {...props}>
      {tags.map((tag) => (
        <Box
          key={tag}
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

const RepositoryInfoPart = createFC<{
  repositoryInfo: ProjectRepositoryInfo;
}>(({ repositoryInfo }) => {
  return (
    <StyledA
      href={repositoryInfo.repositoryUrl}
      target="_blank"
      rel="noreferrer"
    >
      <HStack gap="1px" css={styleObj_TextLinkInheritColor}>
        <IconIconifyZ
          spec="mdi:github"
          q={css({ fontSize: "30px", marginTop: "4px" })}
        />
        <Box fontSize="18px">{repositoryInfo.repositoryProjectPath}</Box>
      </HStack>
    </StyledA>
  );
});

const AuthorPart = createFC<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => {
    return (
      <HStack gap="4px">
        <Img src={avatarUrl} alt="avatar" width="26px" />
        <Box fontSize="18px">{userName}</Box>
      </HStack>
    );
  }
);

const EditorButton = createFC<{ active: boolean; onClick(): void }>(
  ({ active, onClick }) => {
    return (
      <Button q={active && "--active"} onClick={onClick}>
        <IconIconifyZ spec="mdi:edit" />
        <span>エディタ</span>
      </Button>
    );
  }
  // css`
  //   ${flexAligned()};
  //   &.--active {
  //     background: var(--cl-button-edit-active);
  //   }
  // `
);

export const projectHeadingArea_parts = {
  ProjectTitlePart,
  ProjectTagsList,
  RepositoryInfoPart,
  AuthorPart,
  EditorButton,
};
