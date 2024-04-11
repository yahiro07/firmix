import { serverShell } from "@m/web-firmix/central/server_shell.ts";
import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl.ts";
import { oauthClientGithub } from "@m/web-firmix/central/user_auth/oauth_clients.ts";
import { apiOAuthGithub_getUserData } from "shared/foreign/api_oauth_github.ts";
import {
  createGetHandler,
  getRequestSourceUrl,
  responseRedirect,
} from "shared/system/route_helper.ts";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const accessToken = await oauthClientGithub.getAccessToken(reqUrl);
  const loginSource = await apiOAuthGithub_getUserData(accessToken);
  const storageJob = await serverShell.userService.login(loginSource);
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
