import { oauthClientGithub } from "~/be/user_auth/oauth_clients.ts";
import {
  createGetHandler,
  getRequestSourceUrl,
} from "~/system/route_helper.ts";

export const handler = createGetHandler((req) => {
  const reqUrl = getRequestSourceUrl(req);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
