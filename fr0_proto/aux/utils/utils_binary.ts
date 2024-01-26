import { decodeBase64, encodeBase64 } from "$std/encoding/base64.ts";

export function encodeBinaryBase64(bytes: Uint8Array): string {
  return encodeBase64(bytes);
}

export function decodeBinaryBase64(base64: string): Uint8Array {
  return decodeBase64(base64);
}
