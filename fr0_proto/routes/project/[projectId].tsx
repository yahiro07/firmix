import { defineRoute } from "$fresh/server.ts";
import { serverShell } from "~/central/server_shell.ts";
import { ProjectDetailPage } from "~/islands/ProjectDetailPage.tsx";

export default defineRoute(async (req, ctx) => {
  const projectId = ctx.params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId
  );
  return <ProjectDetailPage project={project} />;
});
