import crypto from "crypto";

export function generateHashMd5(input: string | Uint8Array) {
  return crypto.createHash("md5").update(input).digest("hex");
}

export function makeHmacSha256(text: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(text).digest("hex");
}
