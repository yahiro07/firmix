import { Box, BoxProps, HStack, Img } from "@chakra-ui/react";
import { FC } from "react";
import { ProjectRepositoryInfo } from "shared/foreign/types";
import { styleObj_TextLinkInheritColor } from "../../common_styling/common_styles";
import { createFCE2 } from "../../common_styling/create_fce";
import { IconIconifyZ } from "../../components/IconIconifyZ";

const ProjectTitlePart = createFCE2<{
  projectName: string;
  variationName: string;
}>(({ projectName, variationName }) => {
  return (
    <div>
      <HStack as="h2" gap="2px" fontSize="32px">
        <IconIconifyZ
          spec="icon-park-twotone:chip"
          fontSize="36px"
          marginTop="3px"
        />
        <span>{projectName}</span>
      </HStack>
      <Box as="h3" fontSize="28px" if={variationName}>
        {variationName}
      </Box>
    </div>
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

const RepositoryInfoPart = createFCE2<{
  repositoryInfo: ProjectRepositoryInfo;
}>(({ repositoryInfo }) => {
  return (
    <HStack
      as="a"
      href={repositoryInfo.repositoryUrl}
      target="_blank"
      rel="noreferrer"
      gap="1px"
      sx={styleObj_TextLinkInheritColor}
    >
      <IconIconifyZ spec="mdi:github" fontSize="30px" marginTop="4px" />
      <Box fontSize="18px">{repositoryInfo.repositoryProjectPath}</Box>
    </HStack>
  );
});

const AuthorPart = createFCE2<{ userName: string; avatarUrl: string }>(
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
