import { apiOAuthGithub_getUserData } from "@mx/auxiliaries/oauth_fetcher/api_oauth_github";
import { serverShell } from "@mx/web-kfx/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-kfx/app/central/system/client_storage_impl";
import { oauthClientGithub } from "@mx/web-kfx/app/central/user_auth/oauth_clients";
import {
  createGetHandler,
  getRequestSourceUrl,
  responseRedirect,
} from "@mx/web-kfx/app/system/route_helper";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const accessToken = await oauthClientGithub.getAccessToken(reqUrl);
  const loginSource = await apiOAuthGithub_getUserData(accessToken);
  const storageJob = await serverShell.userService.login(loginSource);
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
