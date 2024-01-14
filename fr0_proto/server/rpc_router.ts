import { ServerRpcRouter } from "~/aux/chibi_rpc/types.ts";
import { AppRpcSignatures } from "~/base/types_rpc.ts";
import { serverShell } from "~/server/server_shell.ts";

export const appRpcRouter: ServerRpcRouter<AppRpcSignatures> = {
  // deno-lint-ignore require-await
  async greet({ message }) {
    console.log("greet", message);
    return { resMessage: message + " world" };
  },
  async createProjectFromLocal({ projectInput }) {
    await serverShell.createProjectFromLocal(projectInput);
  },
};
