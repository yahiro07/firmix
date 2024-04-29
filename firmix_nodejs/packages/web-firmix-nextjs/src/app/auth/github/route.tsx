import { oauthClientGithub } from "@mx/web-firmix-nextjs/src/central/user_auth/oauth_clients";
import {
  createGetHandler,
  getRequestSourceUrl_NextJS,
  responseRedirect,
} from "../../route_helper";

export const GET = createGetHandler(({ request }) => {
  const reqUrl = getRequestSourceUrl_NextJS(request);
  const url = oauthClientGithub.getAuthUrl(reqUrl);
  console.log(`auth github`, {
    reqUrl,
    destUrl: url,
    headers: [...request.headers.entries()].map((k, v) => `${k}:${v}`),
  });
  return responseRedirect(url);
});
