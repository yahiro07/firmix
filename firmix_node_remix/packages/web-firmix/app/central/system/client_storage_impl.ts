import {
  decodeTextBase64,
  encodeTextBase64,
} from "auxiliaries/base_env_adapters/base64";
import { myJwt_create, myJwt_verify } from "auxiliaries/myjwt/mod";
import { raiseError } from "auxiliaries/utils/error_util";
import { copyObjectMembers } from "auxiliaries/utils/utils_general";
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "shared/system/cookie";
import { appConfig } from "web-firmix/app/base/app_config";
import { fallbackValues } from "web-firmix/app/base/fallback_values";
import { CoactiveState } from "web-firmix/app/base/types_dto";
import { LoginUserClue } from "web-firmix/app/base/types_dto_internal";
import { getEnvVariable } from "web-firmix/app/central/base/envs";
import { serverConfig } from "web-firmix/app/central/base/server_config";
import { CookieOutputJob } from "web-firmix/app/central/base/types_client_storage";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

type ClientStorageImpl = {
  readCookieLoginUserClue(req: Request): LoginUserClue | undefined;
  readCookieCoactiveState(req: Request): CoactiveState | undefined;
  processCookieOutputJob(res: Response, job: CookieOutputJob): void;
};

function createClientStorageImpl(): ClientStorageImpl {
  const jwtSecret = getEnvVariable("JWT_SECRET");
  const cookieNameLoginUserToken = "fr0_login_user_token";

  const m = {
    readLoginUserClue(req: Request) {
      if (jwtSecret === "__dummy__") raiseError(`invalid jwt secret`);
      const token = getCookies(req.headers)[cookieNameLoginUserToken];
      if (token) {
        const res = myJwt_verify<LoginUserClue>(token, jwtSecret);
        if (res && !res.expired) {
          return res.payload;
        }
      }
      return undefined;
    },
    writeLoginUserClue(res: Response, loginUserClue: LoginUserClue) {
      if (jwtSecret === "__dummy__") raiseError(`invalid jwt secret`);
      const hours = 2;
      const durationSec = 3600 * hours;
      // const durationSec = 60; //debug
      const payload = {
        ...loginUserClue,
        exp: Date.now() + 1000 * durationSec,
      };
      const token = myJwt_create(payload, jwtSecret);
      const cookie: Cookie = {
        name: cookieNameLoginUserToken,
        value: token,
        path: "/",
        maxAge: durationSec,
        sameSite: "Lax",
        secure: !serverConfig.isDevelopment,
        httpOnly: true,
      };
      setCookie(res.headers, cookie);
    },
    clearLoginUserClue(res: Response) {
      deleteCookie(res.headers, cookieNameLoginUserToken, { path: "/" });
    },
    readCoactiveState(req: Request) {
      const text = getCookies(req.headers)[appConfig.coactiveStateCookieKey];
      const state = structuredClone(fallbackValues.coactiveState);
      if (text) {
        try {
          const strObj = decodeTextBase64(text);
          const loadedObj = JSON.parse(strObj);
          copyObjectMembers(state, loadedObj, ["homeTargetRealm_deprecated"]);
        } catch (_) {
          //ignore
        }
      }
      return state;
    },
    writeCoactiveState(res: Response, coactiveState: CoactiveState) {
      const text = encodeTextBase64(JSON.stringify(coactiveState));
      setCookie(res.headers, {
        name: appConfig.coactiveStateCookieKey,
        value: text,
        path: "/",
        maxAge: 86400 * 365,
        httpOnly: false,
      });
    },
  };

  return {
    readCookieLoginUserClue(req) {
      return m.readLoginUserClue(req);
    },
    readCookieCoactiveState(req) {
      return m.readCoactiveState(req);
    },
    processCookieOutputJob(res, job) {
      if (job.op === "writeLoginUserClue") {
        m.writeLoginUserClue(res, job.loginUserClue);
      } else if (job.op === "clearLoginUserClue") {
        m.clearLoginUserClue(res);
      } else if (job.op === "writeCoactiveState") {
        m.writeCoactiveState(res, job.coactiveState);
      } else {
        raiseError(`invalid condition`);
      }
    },
  };
}

export const clientStorageImpl = createClientStorageImpl();
