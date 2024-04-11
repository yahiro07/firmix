import { serverShell } from "@m/web-firmix/central/server_shell.ts";
import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl.ts";
import { ProjectListPage } from "@m/web-firmix/islands/ProjectListPage.tsx";
import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";

export const loader = createLoader(async ({ request }) => {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(request);
  const coactiveState = clientStorageImpl.readCookieCoactiveState(request);
  const projects = await serverShell.projectListService.getProjectList_recent(
    coactiveState?.homeTargetRealm ?? "general",
    loginUserClue?.userId ?? ""
  );
  return { projects };
});

export default createPage(() => {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <ProjectListPage
      projects={projects}
      showPublicity={false}
      showHomeTargetSelectionBar={true}
    />
  );
});
