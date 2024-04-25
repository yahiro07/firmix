import { serverShell } from "../central/server_shell";
import { clientStorageImpl } from "../central/system/client_storage_impl";
import { ProjectListPage } from "../screens/ProjectListPage";

export default async function Home() {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue();
  const projects = await serverShell.projectListService.getProjectList_recent(
    loginUserClue?.userId ?? ""
  );
  return <ProjectListPage projects={projects} showPublicity={false} />;
}
