//ref https://medium.com/deno-the-complete-reference/using-jwt-json-web-token-in-deno-9d0c0346982f

import {
  decodeTextBase64,
  encodeTextBase64,
} from "~/auxiliaries/base_env_adapters/base64";
import { makeHmacSha256 } from "~/auxiliaries/base_env_adapters/crypto";

type Payload = {
  exp?: number; //in milliseconds since epic
  [key: string]: unknown;
};

export function myJwt_create(payload: Payload, secret: string): string {
  const header = { alg: "HS256", type: "JWT" };
  const bHeader = encodeTextBase64(JSON.stringify(header));
  const bPayload = encodeTextBase64(JSON.stringify(payload));
  const tokenRaw = `${bHeader}.${bPayload}`;
  return tokenRaw + "." + makeHmacSha256(tokenRaw, secret);
}

export function myJwt_verify<T>(
  token: string,
  secret: string
): { payload: T; expired: boolean } | undefined {
  const parts = token.split(".");
  if (parts.length !== 3) return undefined;
  const sign = makeHmacSha256(`${parts[0]}.${parts[1]}`, secret);
  if (sign !== parts[2]) return undefined;
  const payload = JSON.parse(decodeTextBase64(parts[1]));
  const expired = payload.exp && Date.now() > payload.exp;
  return { payload, expired };
}
