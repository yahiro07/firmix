/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
// import { Resvg } from "@resvg/resvg-js";
import * as fs from "fs/promises";
// import satori from "satori";
import { createLoader } from "@mx/web-kfx/app/system/route_helper";
import { ProjectDetailDto } from "../base/types_dto";
import { serverShell } from "../central/server_shell";

const state = {
  fontData: undefined as ArrayBuffer | undefined,
};

async function readFont() {
  const path = `${process.cwd()}/public/fonts/higashiome-gothic-1.3i_web.woff`;
  return await fs.readFile(path);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function renderCustomOgpImage(project: ProjectDetailDto) {
  // const fontData = (state.fontData ??= await readFont());
  // const jsx = (
  //   <div style={{ display: "flex" }}>
  //     <img
  //       src={project.thumbnailUrl}
  //       style={{ width: "320px", height: "240px", objectFit: "cover" }}
  //     />
  //     <div
  //       style={{
  //         position: "absolute",
  //         display: "flex",
  //         color: "white",
  //         padding: "2px",
  //         fontWeight: "bold",
  //       }}
  //     >
  //       {project.projectName}
  //     </div>
  //   </div>
  // );
  // const svg = await satori(jsx, {
  //   width: 320,
  //   height: 240,
  //   fonts: [
  //     {
  //       name: "MainFont",
  //       data: fontData!,
  //       weight: 400,
  //       style: "normal",
  //     },
  //     {
  //       name: "MainFontB",
  //       data: fontData!,
  //       weight: 600,
  //       style: "normal",
  //     },
  //   ],
  // });
  // const resvg = new Resvg(svg);
  // const pngData = resvg.render();
  // const data = pngData.asPng();
  // return new Response(data, {
  //   headers: {
  //     "Content-Type": "image/png",
  //   },
  // });
}

async function chainProjectThumbnailData(project: ProjectDetailDto) {
  const res = await fetch(project.thumbnailUrl);
  const data = await res.arrayBuffer();
  return new Response(data, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "",
    },
  });
}

export const loader = createLoader(async ({ params }) => {
  const projectId = params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    ""
  );
  // return renderCustomOgpImage(project);
  return chainProjectThumbnailData(project);
});
