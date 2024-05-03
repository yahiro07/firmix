import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { serverShell } from "../../central/server_shell";
import { clientStorageImpl } from "../../central/system/client_storage_impl";
import { SettingsPage } from "../../screens/SettingsPage";
import { createPage } from "../route_helper";

export default createPage(async () => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue();
  if (!loginUser) {
    raiseError("login required");
  }
  const apiKey = await serverShell.userService.getUserApiKey(loginUser.userId);
  return <SettingsPage apiKey={apiKey} />;
});
