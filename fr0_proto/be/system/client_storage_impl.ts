import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "$std/http/cookie.ts";
import { myJwt_create, myJwt_verify } from "~/aux/myjwt/mod.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { LoginUserClue } from "~/base/types_dto_internal.ts";
import { getEnvVariable } from "~/be/base/envs.ts";
import { serverConfig } from "~/be/base/server_config.ts";
import { CookieOutputJob } from "~/be/base/types_client_storage.ts";

type ClientStorageImpl = {
  readCookieLoginUserClue(req: Request): LoginUserClue | undefined;
  processCookieOutputJob(res: Response, job: CookieOutputJob): void;
};

function createClientStorageImpl(): ClientStorageImpl {
  const jwtSecret = getEnvVariable("JWT_SECRET");
  const cookieNameLoginUserToken = "fr0_login_user_token";

  const m = {
    readCookieLoginUserClue(req: Request) {
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
  };

  return {
    readCookieLoginUserClue(req) {
      return m.readCookieLoginUserClue(req);
    },
    processCookieOutputJob(res, job) {
      if (job.op === "writeLoginUserClue") {
        m.writeLoginUserClue(res, job.loginUserClue);
      } else if (job.op === "clearLoginUserClue") {
        m.clearLoginUserClue(res);
      } else {
        raiseError(`invalid condition`);
      }
    },
  };
}

export const clientStorageImpl = createClientStorageImpl();
