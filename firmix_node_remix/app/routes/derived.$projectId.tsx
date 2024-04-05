import { useLoaderData } from "@remix-run/react";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ChildProjectListPage } from "~/islands/ChildProjectListPage.tsx";
import { createLoader, createPage } from "~/system/route_helper";

export const loader = createLoader(async ({ request, params }) => {
  const projectId = params.projectId!;
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(request);
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  const childProjects =
    await serverShell.projectListService.getProjectList_children(
      projectId,
      loginUserClue?.userId ?? ""
    );
  return { project, childProjects };
});

export default createPage(() => {
  const { project, childProjects } = useLoaderData<typeof loader>();
  return (
    <ChildProjectListPage
      project={project}
      childProjects={childProjects}
      showPublicity={false}
    />
  );
});
