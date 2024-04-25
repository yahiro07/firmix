import { useLoaderData } from "@remix-run/react";
import { raiseError } from "auxiliaries/utils/error_util";
import { createLoader, createPage } from "shared/system/route_helper";
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
