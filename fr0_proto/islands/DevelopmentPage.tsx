import * as idb_keyval from "idb-keyval";
import { useState } from "preact/hooks";
import { createFC } from "~/aux/utils_fe/create_fc.ts";

export const DevelopmentPage = createFC(() => {
  const [text, setText] = useState("");

  const showReadmeFile = async (dirHandle: FileSystemDirectoryHandle) => {
    const fileHandle = await dirHandle.getFileHandle("readme.md");
    const file = await fileHandle.getFile();
    const text = await file.text();
    console.log({ text });
  };

  const restoreLoadedContent = async () => {
    const dirHandle = (await idb_keyval.get("dirHandle")) as
      | FileSystemDirectoryHandle
      | undefined;
    if (dirHandle) {
      const permission0 = await dirHandle.queryPermission({
        mode: "read",
      });
      if (permission0 === "prompt") {
        const permission = await dirHandle.requestPermission({ mode: "read" });
        console.log({ permission });
      }
      setText(`Retrieved file handle "${dirHandle.name}" from IndexedDB.`);
      await showReadmeFile(dirHandle);
    }
  };

  const handleClick = async () => {
    const dirHandle = await window.showDirectoryPicker();
    await idb_keyval.set("dirHandle", dirHandle);
    setText(`Stored file handle for "${dirHandle.name}" in IndexedDB.`);
    await showReadmeFile(dirHandle);
  };

  const handleClick1 = async () => {
    await restoreLoadedContent();
  };

  const handleClick2 = async () => {
    await idb_keyval.set("dirHandle", undefined);
    setText("");
  };

  return (
    <div>
      <div>{text}</div>
      <button onClick={handleClick}>select folder</button>
      <button onClick={handleClick1}>reload</button>
      <button onClick={handleClick2}>close</button>
    </div>
  );
});
