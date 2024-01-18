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
    if (0) {
      //readme内に含まれるサムネイル画像への相対参照をプロジェクトリソースの画像で置き換える対応
      //readme内にサムネイル以外の他の画像を置いたときにこれらが表示されず混乱する可能性があるので、
      //一旦無効にしておく
      const repositoryThumbnailUrl = `${sourceCodeUrl}/${thumbnailImageFileName}`;
      const modHtmlCode = htmlCode.replaceAll(
        repositoryThumbnailUrl,
        thumbnailImageDataUrl
      );
      return modHtmlCode;
    } else {
      return htmlCode;
    }
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
