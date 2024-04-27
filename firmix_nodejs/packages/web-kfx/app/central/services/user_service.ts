import { OAuthLoginSourceUserInfo } from "@mx/auxiliaries/oauth_fetcher/types_oauth";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { pickObjectMembers } from "@mx/auxiliaries/utils/utils_general";
import { generateIdTimeSequential } from "@mx/auxiliaries/utils_be/id_generator";
import { UserEntity } from "@mx/web-kfx/app/base/types_db_entity";
import { LoginUserClue } from "@mx/web-kfx/app/base/types_dto_internal";
import { CookieOutputJob } from "@mx/web-kfx/app/central/base/types_client_storage";
import { storehouse } from "@mx/web-kfx/app/central/depot/storehouse";
import { userHelper } from "@mx/web-kfx/app/central/domain_helpers/user_helper";

export function createUserService() {
  return {
    async login(
      loginSource: OAuthLoginSourceUserInfo
    ): Promise<CookieOutputJob> {
      const loginSourceSignature = `${loginSource.oAuthProviderType}-${loginSource.oAuthUserId}`;
      let user: UserEntity | null = await storehouse.userCollection.findOne({
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
          apiKey: userHelper.generateNewApiKey(),
          apiKeyActive: false,
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
    async logout(): Promise<CookieOutputJob> {
      return { op: "clearLoginUserClue" };
    },
    async getUserApiKey(userId: string): Promise<string | undefined> {
      const user = await storehouse.userCabinet.get(userId);
      return user.apiKeyActive ? user.apiKey : undefined;
    },
    async setApiKeyAvailability(
      userId: string,
      nextActive: boolean
    ): Promise<void> {
      const user = await storehouse.userCabinet.get(userId);
      const currentActive = user.apiKeyActive;
      if (nextActive === currentActive) {
        raiseError(`no state change occurred`);
      }
      if (nextActive) {
        await storehouse.userCabinet.patch(userId, {
          apiKey: userHelper.generateNewApiKey(),
          apiKeyActive: true,
        });
      } else {
        await storehouse.userCabinet.patch(userId, {
          //ユニーク制約があるため、APIを利用しないときもダミーの値を格納
          apiKey: userHelper.generateNewApiKey(),
          apiKeyActive: false,
        });
      }
    },
  };
}
