import { pickObjectMembers } from "~/aux/utils/utils_general.ts";
import {
  generateIdTimeSequential,
  generateRandomId,
} from "~/aux/utils_be/id_generator.ts";
import { LoginUserClue } from "~/base/types_dto_internal.ts";
import { CookieOutputJob } from "~/be/base/types_client_storage.ts";
import { OAuthLoginSourceUserInfo } from "~/be/base/types_oauth.ts";
import { storehouse } from "~/be/depot/storehouse.ts";

export function createUserService() {
  return {
    async login(
      loginSource: OAuthLoginSourceUserInfo
    ): Promise<CookieOutputJob> {
      const loginSourceSignature = `${loginSource.oAuthProviderType}-${loginSource.oAuthUserId}`;
      let user = await storehouse.userCollection.findOne({
        loginSourceSignature,
      });
      if (user) {
        //既存ユーザでログイン
      } else {
        //新規ユーザ登録
        user = {
          userId: generateIdTimeSequential(),
          userName: loginSource.oAuthScreenName,
          avatarUrl: loginSource.oAuthAvatarUrl,
          loginSourceSignature,
          createAt: Date.now(),
          apiKey: generateRandomId(32),
        };
        await storehouse.userCabinet.insert(user);
      }
      const loginUserClue: LoginUserClue = pickObjectMembers(user, [
        "userId",
        "userName",
        "avatarUrl",
      ]);
      return { op: "writeLoginUserClue", loginUserClue };
    },
    // deno-lint-ignore require-await
    async logout(): Promise<CookieOutputJob> {
      return { op: "clearLoginUserClue" };
    },
  };
}
