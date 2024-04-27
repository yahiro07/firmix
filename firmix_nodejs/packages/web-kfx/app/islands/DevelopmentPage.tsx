import { css } from "@linaria/core";
import { useState } from "@mx/auxiliaries/fe-deps-react";
import { serverFetchHelper } from "@mx/auxiliaries/utils_be/server_fetch_helper";
import {
  idbKeyValGet,
  idbKeyValSet,
} from "@mx/auxiliaries/utils_fe/browser_storage_adapter";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { flexVertical } from "../common_styling/utility_styles";
import { ButtonSmall } from "../components/CommonControls";

export const DevelopmentPage = createFC(() => {
  const [text, setText] = useState("");

  const showReadmeFile = async (dirHandle: FileSystemDirectoryHandle) => {
    const fileHandle = await dirHandle.getFileHandle("readme.md");
    const file = await fileHandle.getFile();
    const text = await file.text();
    console.log({ text });
  };

  const restoreLoadedContent = async () => {
    const dirHandle = (await idbKeyValGet("dirHandle")) as
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
    const dirHandle = await globalThis.showDirectoryPicker();
    await idbKeyValSet("dirHandle", dirHandle);
    setText(`Stored file handle for "${dirHandle.name}" in IndexedDB.`);
    await showReadmeFile(dirHandle);
  };

  const handleClick1 = async () => {
    await restoreLoadedContent();
  };

  const handleClick2 = async () => {
    await idbKeyValSet("dirHandle", undefined);
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
          <ButtonSmall onClick={handleClick}>select folder</ButtonSmall>
          <ButtonSmall onClick={handleClick1}>reload</ButtonSmall>
          <ButtonSmall onClick={handleClick2}>close</ButtonSmall>
        </div>
      </div>
      <div>
        <h3>R2 CORSアクセスのデバッグ</h3>
        <div>
          <ButtonSmall onClick={handleClick3}>fetch</ButtonSmall>
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
    margin-right: 8px;
  }
`;
