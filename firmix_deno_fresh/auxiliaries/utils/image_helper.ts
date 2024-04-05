import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { decodeBinaryBase64 } from "~/auxiliaries/utils/utils_binary.ts";

export function imageHelper_extractImageDataUrl(imageDataUrl: string) {
  const m = imageDataUrl.match(/^data:(\w+\/\w+);base64,(.*)$/);
  if (!m) raiseError(`invalid data url`);
  const contentType = m[1];
  const binaryBytes = decodeBinaryBase64(m[2]);
  return { contentType, binaryBytes };
}

type SupportedMimeType = "image/png" | "image/jpeg";

const mimeTypeToExtensionMapper: Record<SupportedMimeType, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
};

export function imageHelper_getImageDataMimeType(
  bytes: Uint8Array
): SupportedMimeType | undefined {
  const buf = [...bytes.slice(0, 4)];
  const code = buf.map((it) => it.toString(16)).join("");
  if (code.startsWith("ffd8ff")) {
    return "image/jpeg";
  } else if (code.startsWith("89504e47")) {
    return "image/png";
  }
  return undefined;
}

export function imageHelper_getImageFormat(
  bytes: Uint8Array
): { mimeType: SupportedMimeType; fileExtension: string } | undefined {
  const mimeType = imageHelper_getImageDataMimeType(bytes);
  if (mimeType) {
    const fileExtension = mimeTypeToExtensionMapper[mimeType];
    return { mimeType, fileExtension };
  }
  return undefined;
}
