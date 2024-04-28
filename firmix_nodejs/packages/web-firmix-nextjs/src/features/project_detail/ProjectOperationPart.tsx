import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { rpcClient } from "@mx/web-firmix-nextjs/src/common/rpc_client";
import { Stack } from "../../../styled-system/jsx";
import {
  ButtonSmall,
  ToggleButtonLarge,
} from "../../components/CommonControls";

export const ProjectOperationPart = createFC<{
  projectId: string;
  published: boolean;
  automated: boolean;
}>(({ projectId, published, automated }) => {
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
    <Stack gap="3" alignItems="flex-end">
      <ToggleButtonLarge
        checked={published}
        setChecked={handleTogglePublicity}
        text={published ? "公開中" : "ドラフト"}
      />
      <ButtonSmall onClick={handleDeleteProject}>削除</ButtonSmall>
    </Stack>
  );
});
