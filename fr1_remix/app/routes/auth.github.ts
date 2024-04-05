import { oauthClientGithub } from "~/central/user_auth/oauth_clients.ts";
import {
  createGetHandler,
  getRequestSourceUrl,
} from "~/system/route_helper.ts";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
