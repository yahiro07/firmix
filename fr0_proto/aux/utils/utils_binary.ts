import { decodeBase64, encodeBase64 } from "$std/encoding/base64.ts";
import { raiseError } from "~/aux/utils/error_util.ts";

export function encodeBinaryBase64(bytes: Uint8Array): string {
  return encodeBase64(bytes);
}

export function decodeBinaryBase64(base64: string): Uint8Array {
  return decodeBase64(base64);
}

export const imageDataUrlHelper = {
  extractImageDataUrl(imageDataUrl: string) {
    const m = imageDataUrl.match(/^data:(\w+\/\w+);base64,(.*)$/);
    if (!m) raiseError(`invalid data url`);
    const contentType = m[1];
    const binaryBytes = decodeBinaryBase64(m[2]);
    return { contentType, binaryBytes };
  },
};
