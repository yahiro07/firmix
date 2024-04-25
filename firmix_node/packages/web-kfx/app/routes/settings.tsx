import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { createLoader, createPage } from "@mx/web-kfx/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";
import { serverShell } from "web-kfx/app/central/server_shell";
import { clientStorageImpl } from "web-kfx/app/central/system/client_storage_impl";
import { SettingsPage } from "web-kfx/app/islands/SettingsPage";

export const loader = createLoader(async ({ request }) => {
  const loginUser = clientStorageImpl.readCookieLoginUserClue(request);
  if (!loginUser) {
    raiseError("login required");
  }
  const apiKey = await serverShell.userService.getUserApiKey(loginUser.userId);
  return { apiKey };
});

export default createPage(() => {
  const { apiKey } = useLoaderData<typeof loader>();
  return <SettingsPage apiKey={apiKey} />;
});
