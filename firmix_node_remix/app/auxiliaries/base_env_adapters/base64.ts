import * as _buffer from "buffer";
const Buffer = _buffer.Buffer;

export function encodeBinaryBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function decodeBinaryBase64(base64Text: string): Uint8Array {
  return Buffer.from(base64Text, "base64");
}

export function encodeTextBase64(text: string) {
  return Buffer.from(text).toString("base64");
}

export function decodeTextBase64(base64Text: string) {
  return Buffer.from(base64Text, "base64").toString();
}
