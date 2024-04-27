import { serverShell } from "@mx/web-firmix-nextjs/src/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix-nextjs/src/central/system/client_storage_impl";
import { ProjectDetailPage } from "@mx/web-firmix-nextjs/src/screens/ProjectDetailPage";
import { createPage } from "../../route_helper";

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   if (data?.project) {
//     const {
//       projectName: title,
//       thumbnailUrl: imageUrl,
//       introduction,
//     } = data.project;
//     return [
//       { title },
//       { property: "og:title", content: title },
//       { property: "og:image", content: imageUrl },
//       { property: "og:description", content: introduction },
//       { name: "twitter:card", content: "summary" },
//       { name: "twitter:image", content: imageUrl },
//       { name: "twitter:description", content: introduction },
//     ];
//   } else {
//     return [{ title: "failed to load project" }];
//   }
// };

export default createPage(async ({ params }) => {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue();
  const projectId = params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  return <ProjectDetailPage project={project} />;
});
