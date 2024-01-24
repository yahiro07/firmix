//ref https://medium.com/deno-the-complete-reference/using-jwt-json-web-token-in-deno-9d0c0346982f

import {
  decode,
  encode,
} from "https://deno.land/std@0.119.0/encoding/base64url.ts";
import { HmacSha256 } from "https://deno.land/std@0.119.0/hash/sha256.ts";

type Payload = {
  exp?: number; //in milliseconds since epic
  [key: string]: unknown;
};

export function myJwt_create(payload: Payload, secret: string): string {
  const header = { alg: "HS256", type: "JWT" };
  const bHeader = encode(new TextEncoder().encode(JSON.stringify(header)));
  const bPayload = encode(new TextEncoder().encode(JSON.stringify(payload)));
  const tokenRaw = `${bHeader}.${bPayload}`;
  return tokenRaw + "." + new HmacSha256(secret).update(tokenRaw).toString();
}

export function myJwt_verify<T>(
  token: string,
  secret: string
): { payload: T; expired: boolean } | undefined {
  const parts = token.split(".");
  if (parts.length !== 3) return undefined;
  const sign = new HmacSha256(secret)
    .update(`${parts[0]}.${parts[1]}`)
    .toString();
  if (sign !== parts[2]) return undefined;
  const payload = JSON.parse(new TextDecoder().decode(decode(parts[1])));
  const expired = payload.exp && Date.now() > payload.exp;
  return { payload, expired };
}
