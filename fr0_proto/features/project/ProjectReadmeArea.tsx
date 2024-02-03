import { CSS, render } from "gfm";
import { useMemo } from "preact/hooks";
import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";

type Props = {
  readmeFileContent: string;
};

export const ProjectReadmeArea = createFC<Props>(({ readmeFileContent }) => {
  const body = useMemo(() => {
    const modContent = readmeFileContent.replace(/^# .*\n$/m, "");
    return render(modContent, {});
  }, [readmeFileContent]);
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
    padding: 20px;
  }
`;
