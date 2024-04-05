import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ChildProjectListPage } from "~/islands/ChildProjectListPage.tsx";

export default defineRoute(async (req, ctx) => {
  const projectId = ctx.params.projectId!;
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(req);
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
