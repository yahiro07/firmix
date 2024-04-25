import { serverShell } from "@mx/web-firmix/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix/app/central/system/client_storage_impl";
import { ChildProjectListPage } from "@mx/web-firmix/app/islands/ChildProjectListPage";
import {
  createLoader,
  createPage,
} from "@mx/web-firmix/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";

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
