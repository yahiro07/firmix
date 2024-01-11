import { defineRoute } from "$fresh/server.ts";
import ProjectDetailPage from "~/islands/ProjectDetailPage.tsx";
import { serverShell } from "~/server/server_shell.ts";

export default defineRoute(async (req, ctx) => {
  const _projectId = ctx.params.projectId!;
  const project = await serverShell.getProjectDetail("__proj1");
  return <ProjectDetailPage project={project} />;
});
