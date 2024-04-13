import { encodeBinaryBase64 } from "auxiliaries/base_env_adapters/base64";
import { raiseError } from "auxiliaries/utils/error_util";
import { filePathHelper } from "auxiliaries/utils/file_path_helper";
import { BinaryFileEntry } from "web-kfx/app/base/types_local_project";
import { ImageFileContainer } from "web-kfx/app/base/types_project_edit";

export const imageFileLoader = {
  async loadBinaryImageFile(
    fileEntry: BinaryFileEntry
  ): Promise<ImageFileContainer> {
    const fileName = filePathHelper.getFileNameFromFilePath(fileEntry.filePath);
    const contentBytes = fileEntry.contentBytes;
    const fileSize = contentBytes.byteLength;
    const binaryBytes = contentBytes;

    const extension = fileName.split(".")[1];
    const mimeType = (
      {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
      } as const
    )[extension];
    if (!mimeType) {
      raiseError(`unsupported image file extension ${extension}`);
    }
    const imageDataUrl = `data:${mimeType};base64,${encodeBinaryBase64(
      binaryBytes
    )}`;
    //縦横のサイズを得るためにImageBitmapを作る
    const blob = new Blob([binaryBytes], { type: mimeType });
    const imageBitmap = await createImageBitmap(blob);
    const { width, height } = imageBitmap;

    return {
      fileName,
      mimeType,
      fileSize,
      width,
      height,
      imageDataUrl,
    };
  },
};
