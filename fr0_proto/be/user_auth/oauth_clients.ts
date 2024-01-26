import { createOAuth2Client } from "~/aux/oauth_client/oauth_client.ts";
import { getEnvVariable } from "~/be/base/envs.ts";

export const oauthClientGithub = createOAuth2Client({
  authEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  callbackPath: "/auth/github/callback",
  clientId: getEnvVariable("GITHUB_CLIENT_ID"),
  clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
});
