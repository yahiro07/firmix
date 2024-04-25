import {
  createGetHandler,
  getRequestSourceUrl,
} from "shared/system/route_helper";
import { oauthClientGithub } from "web-firmix/app/central/user_auth/oauth_clients";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
