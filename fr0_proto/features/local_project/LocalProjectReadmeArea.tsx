import { CSS, render } from "gfm";
import { useMemo } from "preact/hooks";
import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";

type Props = {
  project: LocalDevelopmentProject;
};

export const LocalProjectReadmeArea = createFC<Props>(({ project }) => {
  const body = useMemo(() => {
    const readmeFileContent = project.assetReadme.fileContent;
    if (!readmeFileContent) return undefined;
    return render(readmeFileContent, {});
  }, [project]);

  if (body === undefined) return null;

  return (
    <div q={style}>
      <div q="base-plane">
        <div dangerouslySetInnerHTML={{ __html: body }} q="markdown-body" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </div>
    </div>
  );
});

const style = css`
  > .base-plane {
    background: #fff;
    padding: 20px;
  }
`;
