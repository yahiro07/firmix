import { CSS, render } from "gfm";
import { useMemo } from "preact/hooks";
import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalDevelopmentProject } from "~/base/types_local_project.ts";

type Props = {
  project: LocalDevelopmentProject;
};

export const LocalProjectReadmeArea = createFC<Props>(({ project }) => {
  const body = useMemo(() => {
    const {
      metadataInput: { sourceCodeUrl },
      readmeFileContent,
      thumbnailImageContainer: { imageDataUrl: thumbnailImageDataUrl },
      assetFilePaths: { thumbnail: thumbnailImageFileName },
    } = project;
    const htmlCode = render(readmeFileContent, {
      baseUrl: sourceCodeUrl ? sourceCodeUrl + "/" : "",
    });
    const repositoryThumbnailUrl = `${sourceCodeUrl}/${thumbnailImageFileName}`;
    const modHtmlCode = htmlCode.replaceAll(
      repositoryThumbnailUrl,
      thumbnailImageDataUrl
    );
    return modHtmlCode;
  }, [project]);

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
