import { decode } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { imageHelper_getImageDataMimeType } from "~/auxiliaries/utils/image_helper.ts";
import { ImageAssetAttrs } from "~/base/types_app_common.ts";

export const serverImageHelper = {
  async getImageSize(imageDataBytes: Uint8Array) {
    const img = await decode(imageDataBytes);
    return { width: img.width, height: img.height };
  },
  async loadOnlineImageAssetAttrs(imageUrl: string): Promise<ImageAssetAttrs> {
    const res = await fetch(imageUrl);
    if (res.status !== 200) {
      raiseError(`failed to fetch image ${imageUrl} (${res.status})`);
    }
    const imageArrayBuffer = await res.arrayBuffer();
    const imageFileBytes = new Uint8Array(imageArrayBuffer);

    const mimeType = imageHelper_getImageDataMimeType(imageFileBytes);
    if (!mimeType) {
      raiseError(`invalid or unsupported image file format`);
    }
    const { width, height } = await serverImageHelper.getImageSize(
      imageFileBytes
    );
    const fileSize = imageFileBytes.byteLength;
    return { fileSize, width, height };
  },
};
