import { defineRoute } from "$fresh/server.ts";
import { serverShell } from "~/be/server_shell.ts";
import { ProjectDetailPage } from "~/islands/ProjectDetailPage.tsx";

export default defineRoute(async (req, ctx) => {
  const _projectId = ctx.params.projectId!;
  const project = await serverShell.projectService.getProjectDetail("__proj1");
  return <ProjectDetailPage project={project} />;
});
