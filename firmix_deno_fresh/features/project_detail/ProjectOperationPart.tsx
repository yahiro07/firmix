import { createFCX, css } from "resin";
import { rpcClient } from "~/common/rpc_client.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import {
  ButtonSmall,
  ToggleButtonLarge,
} from "~/components/CommonControls.tsx";

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
