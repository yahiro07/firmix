import { defineRoute } from "$fresh/src/server/defines.ts";
import { oauthClientGithub } from "~/be/user_auth/oauth_clients.ts";
import { getRequestSourceUrl } from "~/system/route_helper.ts";

export const handler = defineRoute((req) => {
  const reqUrl = getRequestSourceUrl(req);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
