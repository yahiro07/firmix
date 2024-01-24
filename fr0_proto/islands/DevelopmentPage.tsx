import * as idb_keyval from "idb-keyval";
import { useState } from "preact/hooks";
import { css } from "resin";
import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { flexVertical } from "~/common/utility_styles.ts";

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

  const handleClick3 = async () => {
    const uri =
      "https://r2-fr0-assets-dev.kermite.org/54ys5lroxs/firmware.uf2?rev=5";
    // const uri = `https://pub-3554afab200443098d621db9883cf974.r2.dev/54ys5lroxs/firmware.uf2?rev=3`;
    const res = await serverFetchHelper.fetchBinary(uri, {});
    console.log({ res });
  };

  return (
    <div q={style}>
      <div>
        <h3>directoryHandleの永続化実験</h3>
        <div>
          <div>{text}</div>
          <button onClick={handleClick}>select folder</button>
          <button onClick={handleClick1}>reload</button>
          <button onClick={handleClick2}>close</button>
        </div>
      </div>
      <div>
        <h3>R2 CORSアクセスのデバッグ</h3>
        <div>
          <button onClick={handleClick3}>fetch</button>
        </div>
      </div>
    </div>
  );
});

const style = css`
  padding: 16px;
  ${flexVertical(16)};
  button {
    padding: 2px 6px;
  }
`;
