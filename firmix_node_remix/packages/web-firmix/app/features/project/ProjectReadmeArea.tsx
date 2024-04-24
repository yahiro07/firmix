import { useMemo } from "auxiliaries/fe-deps-react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box } from "../../../styled-system/jsx";

type Props = {
  readmeFileContent: string;
};

export const ProjectReadmeArea = createFC<Props>(({ readmeFileContent }) => {
  const modContent = useMemo(() => {
    //remove h1 in first line
    return readmeFileContent.replace(/^# .*\n$/m, "");
  }, [readmeFileContent]);
  return (
    <Box padding="10px">
      <Markdown remarkPlugins={[remarkGfm]} className="markdown-body">
        {modContent}
      </Markdown>
    </Box>
  );
});
