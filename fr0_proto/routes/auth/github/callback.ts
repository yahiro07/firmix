import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/be/server_shell.ts";
import { clientStorageImpl } from "~/be/system/client_storage_impl.ts";
import { apiOAuthGithub_getUserData } from "~/be/user_auth/api_oauth_github.ts";
import { oauthClientGithub } from "~/be/user_auth/oauth_clients.ts";
import {
  getRequestSourceUrl,
  responseRedirect,
} from "~/system/route_helper.ts";

export const handler = defineRoute(async (req) => {
  const reqUrl = getRequestSourceUrl(req);
  const accessToken = await oauthClientGithub.getAccessToken(reqUrl);
  const loginSource = await apiOAuthGithub_getUserData(accessToken);
  const storageJob = await serverShell.userService.login(loginSource);
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
