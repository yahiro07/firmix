export const filePathHelper = {
  getFileNameFromFilePath(filePath: string) {
    return filePath.split("/").at(-1)!;
  },
  splitFileName(fileName: string) {
    const [namePart, extension] = fileName.split(".");
    return [namePart, extension];
  },
};
