import sizeOf from "image-size";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { imageHelper_getImageDataMimeType } from "~/auxiliaries/utils/image_helper.ts";
import { ImageAssetAttrs } from "~/base/types_app_common.ts";

export const serverImageHelper = {
  async getImageSize(imageDataBytes: Uint8Array) {
    const res = sizeOf(imageDataBytes);
    if (res.width === undefined || res.height === undefined) {
      raiseError(`cannot read image size`);
    }
    return { width: res.width, height: res.height };
  },
  async loadImageFileAssetAttrs(
    imageFileBytes: Uint8Array
  ): Promise<ImageAssetAttrs> {
    const mimeType = imageHelper_getImageDataMimeType(imageFileBytes);
    if (!mimeType) {
      raiseError(`invalid or unsupported image file format`);
    }
    const { width, height } = await serverImageHelper.getImageSize(
      imageFileBytes
    );
    const fileSize = imageFileBytes.byteLength;
    return { fileSize, width, height, mimeType };
  },
};
