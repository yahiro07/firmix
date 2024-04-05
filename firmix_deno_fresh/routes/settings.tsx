import { defineRoute } from "$fresh/src/server/defines.ts";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { SettingsPage } from "~/islands/SettingsPage.tsx";

export default defineRoute(async (req) => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue(req);
  if (!loginUser) {
    raiseError("login required");
  }
  const apiKey = await serverShell.userService.getUserApiKey(loginUser.userId);
  return <SettingsPage apiKey={apiKey} />;
});
