import {
  createGetHandler,
  getRequestSourceUrl,
} from "shared/system/route_helper.ts";
import { oauthClientGithub } from "~/central/user_auth/oauth_clients.ts";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
