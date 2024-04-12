import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { flexVertical } from "shared/common/utility_styles";
import {
  ButtonSmall,
  ToggleButtonLarge,
} from "shared/components/CommonControls.tsx";
import { rpcClient } from "web-firmix/app/common/rpc_client";

export const ProjectOperationPart = createFCX<{
  projectId: string;
  published: boolean;
  automated: boolean;
}>(
  ({ projectId, published, automated }) => {
    const handleTogglePublicity = async () => {
      await rpcClient.setProjectPublicity({ projectId, published: !published });
      location.reload();
    };
    const handleDeleteProject = async () => {
      let message = `プロジェクトを削除します。よろしいですか。`;
      if (automated) {
        message += `このプロジェクトはAPI経由で更新されています。CIによる投稿処理もあわせて削除してください。`;
      }
      const ok = globalThis.confirm(message);
      if (ok) {
        await rpcClient.deleteProject({ projectId });
        location.href = "/self-projects";
      }
    };
    return (
      <div>
        <ToggleButtonLarge
          checked={published}
          setChecked={handleTogglePublicity}
          text={published ? "公開中" : "ドラフト"}
        />
        <ButtonSmall onClick={handleDeleteProject}>削除</ButtonSmall>
      </div>
    );
  },
  css`
    ${flexVertical(12)};
    align-items: flex-end;
  `
);
