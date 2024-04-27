import { serverShell } from "@mx/web-firmix-nextjs/src/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix-nextjs/src/central/system/client_storage_impl";
import { ChildProjectListPage } from "@mx/web-firmix-nextjs/src/screens/ChildProjectListPage";
import { createPage } from "../../route_helper";

export default createPage(async ({ params }) => {
  const projectId = params.projectId!;
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue();
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  const childProjects =
    await serverShell.projectListService.getProjectList_children(
      projectId,
      loginUserClue?.userId ?? ""
    );
  return (
    <ChildProjectListPage
      project={project}
      childProjects={childProjects}
      showPublicity={false}
    />
  );
});
