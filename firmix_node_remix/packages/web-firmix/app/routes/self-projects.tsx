import { serverShell } from "@m/web-firmix/central/server_shell.ts";
import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl.ts";
import { ProjectListPage } from "@m/web-firmix/islands/ProjectListPage.tsx";
import { useLoaderData } from "@remix-run/react";
import { raiseError } from "auxiliaries/utils/error_util.ts";
import { createLoader, createPage } from "shared/system/route_helper";

export const loader = createLoader(async ({ request }) => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue(request);
  if (!loginUser) raiseError(`login required`);
  const projects = await serverShell.projectListService.getProjectList_self(
    loginUser.userId
  );
  return { projects };
});

export default createPage(() => {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <ProjectListPage
      projects={projects}
      showPublicity={true}
      showHomeTargetSelectionBar={false}
    />
  );
});
