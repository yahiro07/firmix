import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { imageHelper_getImageDataMimeType } from "~/auxiliaries/utils/image_helper.ts";
import { OnlineImageAssetContainer } from "~/base/types_project_edit.ts";

export const imageFileLoader = {
  async loadOnlineImageAsset(
    imageUrl: string
  ): Promise<OnlineImageAssetContainer> {
    const res = await fetch(imageUrl);
    if (res.status !== 200) {
      raiseError(`failed to fetch image ${imageUrl} (${res.status})`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const imageDataBytes = new Uint8Array(arrayBuffer);
    const mimeType = imageHelper_getImageDataMimeType(imageDataBytes);
    if (!mimeType) {
      raiseError(`unsupported image file type}`);
    }
    const fileSize = imageDataBytes.byteLength;

    //縦横のサイズを得るためにImageBitmapを作る
    const blob = new Blob([imageDataBytes], { type: mimeType });
    const imageBitmap = await createImageBitmap(blob);
    const { width, height } = imageBitmap;

    return {
      imageUrl,
      mimeType,
      fileSize,
      width,
      height,
    };
  },
};
