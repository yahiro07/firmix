import { raiseError } from "~/aux/utils/error_util.ts";
import { filePathHelper } from "~/aux/utils/file_path_helper.ts";
import { BinaryFileEntry } from "~/base/types_local_project.ts";
import { ImageFileContainer } from "~/base/types_project_edit.ts";

export const imageFileLoader = {
  async loadBinaryImageFile(
    fileEntry: BinaryFileEntry
  ): Promise<ImageFileContainer> {
    const fileName = filePathHelper.getFileNameFromFilePath(fileEntry.filePath);
    const fileSize = fileEntry.contentBytes.byteLength;
    const binaryBytes = fileEntry.contentBytes;

    const extension = fileName.split(".")[1];
    const mimeType = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
    }[extension];
    if (!mimeType) {
      raiseError(`unsupported image file extension ${extension}`);
    }
    const blob = new Blob([binaryBytes], { type: mimeType });
    const imageBitmap = await createImageBitmap(blob);
    const { width, height } = imageBitmap;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imageBitmap, 0, 0);
    const imageDataUrl = canvas.toDataURL();

    return {
      fileName,
      mimeType,
      fileSize,
      width,
      height,
      binaryBytes,
      imageDataUrl,
    };
  },
};
