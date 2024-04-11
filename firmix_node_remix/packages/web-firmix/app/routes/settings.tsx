import { useLoaderData } from "@remix-run/react";
import { raiseError } from "auxiliaries/utils/error_util.ts";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "web-firmix/app/central/server_shell.ts";
import { clientStorageImpl } from "web-firmix/app/central/system/client_storage_impl.ts";
import { SettingsPage } from "web-firmix/app/islands/SettingsPage.tsx";

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
