"use client";
import { useState } from "@mx/auxiliaries/fe-deps-react";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { rpcClient } from "../common/rpc_client";
import { HStack, Input, VStack } from "../common_styling/utility_components";
import { ButtonSmall } from "../components/CommonControls";
import { IconIconifyZ } from "../components/IconIconifyZ";

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
    <VStack
      gap="12px"
      padding="20px"
      bgcolor="var(--cl-content-background)"
      height="100%"
    >
      <h3>APIアクセスキー</h3>
      <HStack gap={0}>
        <Input
          value={apiKey}
          readOnly
          type={exhibit ? "text" : "password"}
          width="360px"
          height="32px"
        />
        <ButtonSmall
          disabled={!apiKey}
          onClick={toggleExhibit}
          width="32px"
          height="32px"
          marginLeft="1px"
        >
          <IconIconifyZ spec="fa-solid:eye" if={exhibit} />
          <IconIconifyZ spec="fa-solid:eye-slash" if={!exhibit} />
        </ButtonSmall>
        <ButtonSmall
          onClick={handleOperationButton}
          height="32px"
          padding="0 8px"
          marginLeft="20px"
        >
          {!apiKey ? "生成" : "破棄"}
        </ButtonSmall>
      </HStack>
      <div>
        CIタスクからAPI経由でプロジェクトを投稿/更新するときに使用します。
        <br />
        Github Actionで利用する際にはSecretsに格納してください。
      </div>
    </VStack>
  );
});
