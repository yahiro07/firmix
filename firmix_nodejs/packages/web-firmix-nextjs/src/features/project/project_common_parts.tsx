import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";

import { createFCE } from "../../common_styling/create_fce";
import { HStack, StyledLink } from "../../common_styling/utility_components";
import { IconIconify } from "../../components/IconIconify";

const ProjectLinkCommon = createFC<{
  pagePath: string;
  iconSpec: string;
  iconYOffset: string;
  text: string;
  smaller?: boolean;
}>(({ pagePath, iconSpec, iconYOffset, text, smaller }) => (
  <StyledLink href={pagePath} display="inline-flex">
    <HStack
      gap="2px"
      color="#666"
      fontSize={smaller ? "0.9em" : "1.0em"}
      sx={{
        "&:hover": { textDecoration: "underline" },
      }}
    >
      <IconIconify spec={iconSpec} sx={{ marginTop: iconYOffset }} />
      <span>{text}</span>
    </HStack>
  </StyledLink>
));

export const LinkChildProjectListPage = createFCE<{
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

export const LinkParentProjectPage = createFCE<{
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
