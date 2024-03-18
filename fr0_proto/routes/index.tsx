import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectListPage } from "~/islands/ProjectListPage.tsx";

export default defineRoute(async (req) => {
  const coactiveState = clientStorageImpl.readCookieCoactiveState(req);
  const projects = await serverShell.projectListService.getProjectList_recent(
    coactiveState?.homeTargetRealm ?? "general"
  );
  return <ProjectListPage projects={projects} showPublicity={false} />;
});
