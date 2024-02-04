import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/central/server_shell.ts";
import { ProjectListPage } from "~/islands/ProjectListPage.tsx";

export default defineRoute(async () => {
  const projects = await serverShell.projectListService.getProjectList_recent();
  return <ProjectListPage projects={projects} showPublicity={false} />;
});
