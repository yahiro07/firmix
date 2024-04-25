import { oauthClientGithub } from "@mx/web-kfx/app/central/user_auth/oauth_clients";
import {
  createGetHandler,
  getRequestSourceUrl,
} from "@mx/web-kfx/app/system/route_helper";

export const loader = createGetHandler(async ({ request }) => {
  const reqUrl = getRequestSourceUrl(request);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  return Response.redirect(url);
});
