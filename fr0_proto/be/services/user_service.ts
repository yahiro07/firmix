import { OAuthLoginSourceUserInfo } from "~/be/base/types_oauth.ts";

export function createUserService() {
  return {
    async login(_loginSource: OAuthLoginSourceUserInfo) {},
    async logout() {},
  };
}
