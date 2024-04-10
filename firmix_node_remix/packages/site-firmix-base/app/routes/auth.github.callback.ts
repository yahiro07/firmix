import { apiOAuthGithub_getUserData } from "shared/foreign/api_oauth_github.ts";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { oauthClientGithub } from "~/central/user_auth/oauth_clients.ts";
import {
  createGetHandler,
  getRequestSourceUrl,
  responseRedirect,
} from "~/system/route_helper.ts";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const accessToken = await oauthClientGithub.getAccessToken(reqUrl);
  const loginSource = await apiOAuthGithub_getUserData(accessToken);
  const storageJob = await serverShell.userService.login(loginSource);
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
