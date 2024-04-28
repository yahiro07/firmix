import { ProjectRepositoryInfo } from "@mx/shared/github/types_github";
import { FC } from "react";

import { Box, BoxProps } from "@mui/system";
import { styleObj_TextLinkInheritColor } from "../../common_styling/common_styles";
import { createFCE } from "../../common_styling/create_fce";
import {
  H2,
  H3,
  HStack,
  Img,
  StyledA,
} from "../../common_styling/utility_components";
import { flexAligned } from "../../common_styling/utility_styles";
import { IconIconifyZ } from "../../components/IconIconifyZ";

const ProjectTitlePart = createFCE<{
  projectName: string;
  variationName: string;
}>(({ projectName, variationName }) => {
  return (
    <Box>
      <H2 sx={flexAligned} gap="2px" fontSize="32px">
        <IconIconifyZ
          spec="icon-park-twotone:chip"
          sx={{ fontSize: "36px", marginTop: "3px" }}
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
    <HStack gap="8px" {...props}>
      {tags.map((tag) => (
        <Box
          key={tag}
          fontSize="14px"
          bgcolor="#bbb"
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

const RepositoryInfoPart = createFCE<{
  repositoryInfo: ProjectRepositoryInfo;
}>(({ repositoryInfo }) => {
  return (
    <StyledA
      href={repositoryInfo.repositoryUrl}
      target="_blank"
      rel="noreferrer"
    >
      <HStack gap="1px" sx={styleObj_TextLinkInheritColor}>
        <IconIconifyZ
          spec="mdi:github"
          sx={{ fontSize: "30px", marginTop: "4px" }}
        />
        <Box fontSize="18px">{repositoryInfo.repositoryProjectPath}</Box>
      </HStack>
    </StyledA>
  );
});

const AuthorPart = createFCE<{ userName: string; avatarUrl: string }>(
  ({ userName, avatarUrl }) => {
    return (
      <HStack gap="4px">
        <Img src={avatarUrl} alt="avatar" width="26px" />
        <Box fontSize="18px">{userName}</Box>
      </HStack>
    );
  }
);

export const projectHeadingArea_parts = {
  ProjectTitlePart,
  ProjectTagsList,
  RepositoryInfoPart,
  AuthorPart,
};
