export const filePathHelper = {
  getFolderPath(filePath: string) {
    const segments = filePath.split("/");
    segments.pop();
    return segments.join("/");
  },
  getFileNameFromFilePath(filePath: string) {
    return filePath.split("?")[0].split("/").at(-1)!;
  },
  splitFileName(fileName: string): [string, string] {
    const [namePart, extension] = fileName.split(".");
    return [namePart, extension];
  },
  getExtension(filePath: string) {
    const fileName = filePathHelper.getFileNameFromFilePath(filePath);
    return filePathHelper.splitFileName(fileName)[1];
  },
  replaceExtension(path: string, ext: string) {
    return path.split(".")[0] + "." + ext;
  },
};
