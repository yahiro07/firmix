import {
  decodeTextBase64,
  encodeTextBase64,
} from "@mx/auxiliaries/base_env_adapters/base64";
import { myJwt_create, myJwt_verify } from "@mx/auxiliaries/myjwt/mod";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { copyObjectMembers } from "@mx/auxiliaries/utils/utils_general";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { appConfig } from "../../base/app_config";
import { fallbackValues } from "../../base/fallback_values";
import { CoactiveState } from "../../base/types_dto";
import { LoginUserClue } from "../../base/types_dto_internal";
import { getEnvVariable } from "../base/envs";
import { serverConfig } from "../base/server_config";
import { CookieOutputJob } from "../base/types_client_storage";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

type ClientStorageImpl = {
  readCookieLoginUserClue(): LoginUserClue | undefined;
  readCookieCoactiveState(): CoactiveState | undefined;
  processCookieOutputJob(job: CookieOutputJob): void;
};

function createClientStorageImpl(): ClientStorageImpl {
  const jwtSecret = getEnvVariable("JWT_SECRET");
  const cookieNameLoginUserToken = "fr0_login_user_token";

  const cookieStore = cookies();

  const ck = {
    getCookie(name: string) {
      return cookieStore.get(name)?.value;
    },
    setCookie(cookie: ResponseCookie) {
      cookieStore.set(cookie);
    },
    deleteCookie(...args: Parameters<typeof cookieStore.delete>) {
      cookieStore.delete(...args);
    },
  };

  const m = {
    readLoginUserClue() {
      if (jwtSecret === "__dummy__") raiseError(`invalid jwt secret`);
      const token = ck.getCookie(cookieNameLoginUserToken);
      if (token) {
        const res = myJwt_verify<LoginUserClue>(token, jwtSecret);
        if (res && !res.expired) {
          return res.payload;
        }
      }
      return undefined;
    },
    writeLoginUserClue(loginUserClue: LoginUserClue) {
      if (jwtSecret === "__dummy__") raiseError(`invalid jwt secret`);
      const hours = 2;
      const durationSec = 3600 * hours;
      // const durationSec = 60; //debug
      const payload = {
        ...loginUserClue,
        exp: Date.now() + 1000 * durationSec,
      };
      const token = myJwt_create(payload, jwtSecret);

      ck.setCookie({
        name: cookieNameLoginUserToken,
        value: token,
        path: "/",
        maxAge: durationSec,
        sameSite: "lax",
        secure: !serverConfig.isDevelopment,
        httpOnly: true,
      });
    },
    clearLoginUserClue() {
      ck.deleteCookie({ name: cookieNameLoginUserToken, path: "/" });
    },
    readCoactiveState() {
      const text = ck.getCookie(appConfig.coactiveStateCookieKey);
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
    writeCoactiveState(coactiveState: CoactiveState) {
      const text = encodeTextBase64(JSON.stringify(coactiveState));
      ck.setCookie({
        name: appConfig.coactiveStateCookieKey,
        value: text,
        path: "/",
        maxAge: 86400 * 365,
        httpOnly: false,
      });
    },
  };

  return {
    readCookieLoginUserClue() {
      return m.readLoginUserClue();
    },
    readCookieCoactiveState() {
      return m.readCoactiveState();
    },
    processCookieOutputJob(job) {
      if (job.op === "writeLoginUserClue") {
        m.writeLoginUserClue(job.loginUserClue);
      } else if (job.op === "clearLoginUserClue") {
        m.clearLoginUserClue();
      } else if (job.op === "writeCoactiveState") {
        m.writeCoactiveState(job.coactiveState);
      } else {
        raiseError(`invalid condition`);
      }
    },
  };
}

export const clientStorageImpl = createClientStorageImpl();
