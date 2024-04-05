import { decodeBase64, encodeBase64 } from "$std/encoding/base64.ts";

export function encodeBinaryBase64(bytes: Uint8Array): string {
  return encodeBase64(bytes);
}

export function decodeBinaryBase64(base64: string): Uint8Array {
  return decodeBase64(base64);
}

export function stringifyBytesHex(bytes: number[]): string {
  return bytes
    .map((byte) => byte.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

export function convertTextToBinaryBytes(
  text: string,
  addNullTerminator: boolean
): number[] {
  const bytes = new TextEncoder().encode(text);
  if (addNullTerminator) {
    return [...bytes, 0];
  } else {
    return [...bytes];
  }
}
