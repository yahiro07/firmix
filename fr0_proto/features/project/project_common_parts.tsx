import { createFCX, css } from "resin";
import { flexAligned } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

export const LinkDerivedProjectPage = createFCX<{
  project: { projectId: string; numChildProjects: number };
  smaller?: boolean;
}>(
  ({ project, smaller }) => {
    const { projectId, numChildProjects } = project;
    const derivedPagePath = `/derived/${projectId}`;
    return (
      <a href={derivedPagePath} q={smaller && "--smaller"}>
        <IconIconify spec="fa:code-fork" q="icon" />
        <span>{numChildProjects}件の派生プロジェクト</span>
      </a>
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
