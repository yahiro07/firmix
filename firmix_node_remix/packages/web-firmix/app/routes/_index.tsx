import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "web-firmix/app/central/server_shell";
import { clientStorageImpl } from "web-firmix/app/central/system/client_storage_impl";
import { ProjectListPage } from "web-firmix/app/islands/ProjectListPage.tsx";

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
