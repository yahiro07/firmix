import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { StyledLink } from "../../common_styling/utility_components";
import { IconIconify } from "../../components/IconIconify";

const ProjectLinkCommon = createFC<{
  pagePath: string;
  iconSpec: string;
  iconYOffset: string;
  text: string;
  smaller?: boolean;
}>(({ pagePath, iconSpec, iconYOffset, text, smaller }) => (
  <StyledLink to={pagePath}>
    <HStack
      gap="2px"
      color="#666"
      fontSize={smaller ? "0.9em" : "1.0em"}
      _hover={{ textDecoration: "underline" }}
    >
      <IconIconify spec={iconSpec} q={css({ marginTop: iconYOffset })} />
      <span>{text}</span>
    </HStack>
  </StyledLink>
));

export const LinkChildProjectListPage = createFC<{
  project: { projectId: string; numChildProjects: number };
  smaller?: boolean;
}>(({ project, smaller }) => {
  const { projectId, numChildProjects } = project;
  const pagePath = `/derived/${projectId}`;
  return (
    <ProjectLinkCommon
      pagePath={pagePath}
      iconSpec="fa:code-fork"
      iconYOffset="1px"
      text={`${numChildProjects}件の派生プロジェクト`}
      smaller={smaller}
    />
  );
});

export const LinkParentProjectPage = createFC<{
  projectId: string;
  smaller?: boolean;
}>(({ projectId, smaller }) => {
  const pagePath = `/project/${projectId}`;
  return (
    <ProjectLinkCommon
      pagePath={pagePath}
      iconSpec="material-symbols:trip-origin"
      iconYOffset="0"
      text="派生元プロジェクト"
      smaller={smaller}
    />
  );
});
