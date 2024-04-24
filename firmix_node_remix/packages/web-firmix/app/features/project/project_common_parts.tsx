import { HStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { createFCE2 } from "auxiliaries/utils_fe_react/create_fce";
import { IconIconify } from "shared/components/IconIconify";

const ProjectLinkCommon = createFCE2<{
  pagePath: string;
  iconSpec: string;
  iconYOffset: string;
  text: string;
  smaller?: boolean;
}>(({ pagePath, iconSpec, iconYOffset, text, smaller }) => (
  <HStack
    as={Link}
    to={pagePath}
    display="inline-flex"
    gap="2px"
    color="#666"
    fontSize={smaller ? "0.9em" : "1.0em"}
    sx={{
      "&:hover": { textDecoration: "underline" },
    }}
  >
    <IconIconify spec={iconSpec} marginTop={iconYOffset} />
    <span>{text}</span>
  </HStack>
));

export const LinkChildProjectListPage = createFCE2<{
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

export const LinkParentProjectPage = createFCE2<{
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
