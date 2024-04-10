import { serverFetchHelper } from "auxiliaries/utils_be/server_fetch_helper.ts";
import { OAuthLoginSourceUserInfo } from "~/central/base/types_oauth.ts";

type ApiGitHubGetUserResponsePartial = {
  id: number;
  login: string;
  avatar_url: string;
};

export async function apiOAuthGithub_getUserData(
  accessToken: string
): Promise<OAuthLoginSourceUserInfo> {
  const userData =
    await serverFetchHelper.fetchJson<ApiGitHubGetUserResponsePartial>(
      "https://api.github.com/user",
      { headers: { Authorization: `token ${accessToken}` } }
    );
  const { id, login, avatar_url } = userData;
  return {
    oAuthProviderType: "github",
    oAuthUserId: id.toString(),
    oAuthScreenName: login,
    oAuthAvatarUrl: avatar_url,
  };
}
