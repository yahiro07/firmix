import { css } from "@linaria/core";
import { useMemo } from "@mx/auxiliaries/fe-deps-react";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  readmeFileContent: string;
};

export const ProjectReadmeArea = createFC<Props>(({ readmeFileContent }) => {
  const modContent = useMemo(() => {
    //remove h1 in first line
    return readmeFileContent.replace(/^# .*\n$/m, "");
  }, [readmeFileContent]);
  return (
    <div q={style}>
      <div q="base-plane">
        <Markdown remarkPlugins={[remarkGfm]} className="markdown-body">
          {modContent}
        </Markdown>
      </div>
    </div>
  );
});

const style = css`
  > .base-plane {
    padding: 10px;
  }
`;
