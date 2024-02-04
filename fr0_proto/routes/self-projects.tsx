import { defineRoute } from "$fresh/src/server/defines.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectListPage } from "~/islands/ProjectListPage.tsx";

export default defineRoute(async (req) => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue(req);
  if (!loginUser) raiseError(`login required`);
  const projects = await serverShell.projectListService.getProjectList_self(
    loginUser.userId
  );
  return <ProjectListPage projects={projects} />;
});
