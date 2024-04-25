import { serverShell } from "@mx/web-kfx/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-kfx/app/central/system/client_storage_impl";
import { ProjectListPage } from "@mx/web-kfx/app/islands/ProjectListPage";
import { createLoader, createPage } from "@mx/web-kfx/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";

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
