import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { serverShell } from "../../central/server_shell";
import { clientStorageImpl } from "../../central/system/client_storage_impl";
import { ProjectListPage } from "../../screens/ProjectListPage";
import { createPage } from "../route_helper";

export default createPage(async () => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue();
  if (!loginUser) raiseError(`login required`);
  const projects = await serverShell.projectListService.getProjectList_self(
    loginUser.userId
  );
  return <ProjectListPage projects={projects} showPublicity={true} />;
});
