import { css } from "@linaria/core";
import { Link } from "@remix-run/react";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { flexAligned } from "../../common_styling/utility_styles";
import { IconIconify } from "../../components/IconIconify";

export const LinkChildProjectListPage = createFCX<{
  project: { projectId: string; numChildProjects: number };
  smaller?: boolean;
}>(
  ({ project, smaller }) => {
    const { projectId, numChildProjects } = project;
    const pagePath = `/derived/${projectId}`;
    return (
      <Link to={pagePath} q={smaller && "--smaller"}>
        <IconIconify spec="fa:code-fork" q="icon" />
        <span>{numChildProjects}件の派生プロジェクト</span>
      </Link>
    );
  },
  css`
    ${flexAligned(2)};
    color: #666;
    &.--smaller {
      font-size: 0.9em;
    }

    > .icon {
      margin-top: 1px;
    }

    &:hover {
      text-decoration: underline;
    }
  `
);

export const LinkParentProjectPage = createFCX<{
  projectId: string;
  smaller?: boolean;
}>(
  ({ projectId, smaller }) => {
    const pagePath = `/project/${projectId}`;
    return (
      <Link to={pagePath} q={smaller && "--smaller"}>
        <IconIconify spec="material-symbols:trip-origin" q="icon" />
        <span>派生元プロジェクト</span>
      </Link>
    );
  },
  css`
    ${flexAligned(2)};
    color: #666;
    &.--smaller {
      font-size: 0.9em;
    }

    > .icon {
      margin-top: 1px;
    }

    &:hover {
      text-decoration: underline;
    }
  `
);
