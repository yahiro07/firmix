import { useState } from "preact/hooks";
import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { rpcClient } from "~/common/rpc_client.ts";
import { colors } from "~/common/ui_theme.ts";
import {
  flexCentered,
  flexHorizontalAligned,
  flexVertical,
} from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

type Props = {
  apiKey: string | undefined;
};

export const SettingsPage = createFC<Props>(({ apiKey }: Props) => {
  const [exhibit, setExhibit] = useState(false);

  const toggleExhibit = () => setExhibit((prev) => !prev);

  const handleOperationButton = async () => {
    const nextEnabled = !apiKey;
    if (!nextEnabled) {
      const ok = window.confirm(
        `APIキーを削除します。このAPIキーはこれ以降利用できなくなります。`
      );
      if (!ok) return;
    }
    await rpcClient.setApiKeyAvailability({ enabled: nextEnabled });
    location.reload();
  };

  return (
    <div q={style}>
      <h3>APIアクセスキー</h3>
      <div q="edit-row">
        <input value={apiKey} readOnly type={exhibit ? "text" : "password"} />
        <button q="btn-eye" disabled={!apiKey} onClick={toggleExhibit}>
          <IconIconify spec="fa-solid:eye" if={exhibit} />
          <IconIconify spec="fa-solid:eye-slash" if={!exhibit} />
        </button>
        <button q="btn-op" onClick={handleOperationButton}>
          {!apiKey ? "生成" : "破棄"}
        </button>
      </div>
      <div>
        CIタスクからAPI経由でプロジェクトを投稿する際に使用します。
        <br />
        APIキーを公開データに含めないように注意してください。
        <br />
        Github Actionで利用する際にはSecretsに格納してください。
      </div>
    </div>
  );
});

const style = css`
  padding: 20px;
  ${flexVertical(12)};
  background: ${colors.contentBackground};
  height: 100%;

  > .edit-row {
    ${flexHorizontalAligned()};
    > input,
    > button {
      height: 32px;
    }
    > button {
      ${flexCentered()};
    }
    > .btn-eye {
      width: 32px;
    }
    > .btn-op {
      margin-left: 20px;
      padding: 0 8px;
    }
  }
`;
