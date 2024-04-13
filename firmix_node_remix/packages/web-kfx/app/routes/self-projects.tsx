import { useLoaderData } from "@remix-run/react";
import { raiseError } from "auxiliaries/utils/error_util";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "web-kfx/app/central/server_shell";
import { clientStorageImpl } from "web-kfx/app/central/system/client_storage_impl";
import { ProjectListPage } from "web-kfx/app/islands/ProjectListPage";

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
