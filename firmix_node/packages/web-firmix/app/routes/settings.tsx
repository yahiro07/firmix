import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { serverShell } from "@mx/web-firmix/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix/app/central/system/client_storage_impl";
import { SettingsPage } from "@mx/web-firmix/app/islands/SettingsPage";
import {
  createLoader,
  createPage,
} from "@mx/web-firmix/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";

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
