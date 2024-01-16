export const filePathHelper = {
  getFileNameFromFilePath(filePath: string) {
    return filePath.split("/").at(-1)!;
  },
  splitFileName(fileName: string): [string, string] {
    const [namePart, extension] = fileName.split(".");
    return [namePart, extension];
  },
  getExtension(fileName: string) {
    return filePathHelper.splitFileName(fileName)[1];
  },
};
