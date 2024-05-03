import "@mx/auxiliaries/typings/file_system_access";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import {
  BinaryFileEntryWithTimestamp,
  TextFileEntry,
} from "../../base/types_local_project";

export function createLocalDirectoryReader(
  rootDirHandle: FileSystemDirectoryHandle
) {
  const m = {
    splitTextAtLastCharPos(text: string, char: string): [string, string] {
      const pos = text.lastIndexOf(char);
      if (pos >= 0) {
        return [text.slice(0, pos), text.slice(pos + 1, text.length)];
      } else {
        return ["", text];
      }
    },
    splitPathIntoFolderAndFile(path: string): [string, string] {
      return m.splitTextAtLastCharPos(path, "/");
    },
    async digDownSubFolders(path: string) {
      const segments = path.split("/");
      if (segments.length === 1) {
        return rootDirHandle;
      }
      let dh = rootDirHandle;
      for (const seg of segments) {
        dh = await dh.getDirectoryHandle(seg);
      }
      return dh;
    },
    async getSubFolderNamesUnder(path: string) {
      const dirHandle = await m.digDownSubFolders(path);
      const subFolderNames: string[] = [];
      for await (const [name, handle] of dirHandle) {
        if (handle.kind === "directory") {
          subFolderNames.push(name);
        }
      }
      return subFolderNames;
    },
    async getFile(path: string) {
      const [dirPath, fileName] = m.splitPathIntoFolderAndFile(path);
      const dirHandle = await m.digDownSubFolders(dirPath);
      const fileHandle = await dirHandle.getFileHandle(fileName);
      return await fileHandle.getFile();
    },
  };
  return {
    async readTextFile(path: string): Promise<TextFileEntry | undefined> {
      try {
        const file = await m.getFile(path);
        const contentText = await file.text();
        return { filePath: path, contentText };
      } catch (_) {
        return undefined;
      }
    },
    async readBinaryFile(
      path: string
    ): Promise<BinaryFileEntryWithTimestamp | undefined> {
      try {
        const file = await m.getFile(path);
        const contentBytes = new Uint8Array(await file.arrayBuffer());
        return {
          filePath: path,
          contentBytes,
          lastModified: file.lastModified,
        };
      } catch (_) {
        return undefined;
      }
    },
    async getSingleSubDirectoryNameUnder(path: string): Promise<string> {
      const subFolderNames = await m.getSubFolderNamesUnder(path);
      if (subFolderNames.length == 0) {
        raiseError(`no folder found under ${path}`);
      } else if (subFolderNames.length >= 2) {
        raiseError(
          `unsupported folder structure: more than 1 folders found under ${path}`
        );
      }
      return subFolderNames[0];
    },
    async getSubDirectoryHandle(
      path: string
    ): Promise<FileSystemDirectoryHandle> {
      return await m.digDownSubFolders(path);
    },
  };
}
