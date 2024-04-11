import { oAuthClientModuleHelpers } from "./oauth_client_module_helpers.ts";

const { raiseError, postJson, urlHelper } = oAuthClientModuleHelpers;

export type OAuthClient = {
  getAuthUrl(requestUrl: string): string;
  getAccessToken(requestUrl: string): Promise<string>;
};

type ICreateOAuth2ClientOptions = {
  authEndpoint: string;
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  callbackPath: string;
  authRequestParameters?: Record<string, string>;
  tokenRequestParameters?: Record<string, string>;
};

export function createOAuth2Client({
  authEndpoint,
  tokenEndpoint,
  clientId,
  clientSecret,
  callbackPath,
  authRequestParameters,
  tokenRequestParameters,
}: ICreateOAuth2ClientOptions): OAuthClient {
  return {
    getAuthUrl(requestUrl) {
      if (!clientId) raiseError(`undefined clientId`);
      const callbackUrl = urlHelper.replaceUrlPath(requestUrl, callbackPath);
      const destUrl = urlHelper.buildUrlWithQueries(authEndpoint, {
        client_id: clientId,
        redirect_uri: callbackUrl,
        ...authRequestParameters,
      });
      return destUrl;
    },
    async getAccessToken(requestUrl) {
      const { code } = urlHelper.getQueryObject(requestUrl);
      if (!code) raiseError(`blank code`);
      const callbackUrl = urlHelper.replaceUrlPath(requestUrl, callbackPath);
      const data = await postJson<{ access_token: string }>(tokenEndpoint, {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUrl,
        code,
        ...tokenRequestParameters,
      });
      return data.access_token;
    },
  };
}
