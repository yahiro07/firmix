import { defineRoute } from "$fresh/server.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectDetailPage } from "~/islands/ProjectDetailPage.tsx";

export default defineRoute(async (req, ctx) => {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(req);
  const projectId = ctx.params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  return <ProjectDetailPage project={project} />;
});
