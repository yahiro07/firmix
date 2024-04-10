import { useLoaderData } from "@remix-run/react";
import { raiseError } from "auxiliaries/utils/error_util.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectListPage } from "~/islands/ProjectListPage.tsx";
import { createLoader, createPage } from "~/system/route_helper";

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
