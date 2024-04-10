import { css } from "@linaria/core";
import { useState } from "auxiliaries/fe-deps-react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import {
  flexAligned,
  flexCentered,
  flexVertical,
} from "shared/common/utility_styles.ts";
import { ButtonSmall } from "shared/components/CommonControls.tsx";
import { IconIconifyZ } from "shared/components/IconIconifyZ.tsx";
import { rpcClient } from "~/common/rpc_client.ts";
import { colors } from "~/common/ui_theme.ts";

type Props = {
  apiKey: string | undefined;
};

export const SettingsPage = createFC<Props>(({ apiKey }: Props) => {
  const [exhibit, setExhibit] = useState(false);

  const toggleExhibit = () => setExhibit((prev) => !prev);

  const handleOperationButton = async () => {
    const nextEnabled = !apiKey;
    if (!nextEnabled) {
      const ok = globalThis.confirm(
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
        <ButtonSmall q="btn-eye" disabled={!apiKey} onClick={toggleExhibit}>
          <IconIconifyZ spec="fa-solid:eye" if={exhibit} />
          <IconIconifyZ spec="fa-solid:eye-slash" if={!exhibit} />
        </ButtonSmall>
        <ButtonSmall q="btn-op" onClick={handleOperationButton}>
          {!apiKey ? "生成" : "破棄"}
        </ButtonSmall>
      </div>
      <div>
        CIタスクからAPI経由でプロジェクトを投稿/更新するときに使用します。
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
    ${flexAligned()};
    > input,
    > button {
      height: 32px;
    }
    > button {
      ${flexCentered()};
    }
    > .btn-eye {
      margin-left: 1px;
      width: 32px;
    }
    > .btn-op {
      margin-left: 20px;
      padding: 0 8px;
    }
  }
`;
