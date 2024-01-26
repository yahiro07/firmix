import { handleServerRpc } from "~/aux/chibi_rpc/server.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { AppRpcContext } from "~/base/types_rpc.ts";
import { appRpcRouter } from "~/central/rpc_router.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { createPostHandler, readRequestBody } from "~/system/route_helper.ts";

export const handler = createPostHandler(async (req, ctx) => {
  const op = ctx.params.op;
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(req);
  if (!loginUserClue) raiseError(`login required`);
  const payload = await readRequestBody(req);
  const context: AppRpcContext = { loginUserId: loginUserClue.userId };
  const result = await handleServerRpc(
    appRpcRouter,
    op,
    payload,
    context,
    false
  );
  return Response.json(result ?? {});
});
