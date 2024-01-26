import { ServerRpcRouterWithContext } from "~/aux/chibi_rpc/types.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { AppRpcContext, AppRpcSignatures } from "~/base/types_rpc.ts";
import { serverShell } from "~/be/server_shell.ts";

export const appRpcRouter: ServerRpcRouterWithContext<
  AppRpcSignatures,
  AppRpcContext
> = {
  // deno-lint-ignore require-await
  async greet({ message }, { loginUserId }) {
    console.log("greet", message);
    return { resMessage: message + " world " + loginUserId };
  },
  async upsertProjectFromLocal({ projectPayload }, { loginUserId }) {
    if (!loginUserId) raiseError(`login required`);
    await serverShell.projectService.upsertProjectFromLocal(
      projectPayload,
      loginUserId
    );
  },
  async generatePatchedFirmware({ projectId, editItems }) {
    return await serverShell.firmwareService.generatePatchedFirmware(
      projectId,
      editItems
    );
  },
};
