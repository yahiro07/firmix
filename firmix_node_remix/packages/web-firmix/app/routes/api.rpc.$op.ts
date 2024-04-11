import { AppRpcContext } from "@m/web-firmix/base/types_rpc.ts";
import { appRpcRouter } from "@m/web-firmix/central/rpc_router.ts";
import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl.ts";
import { handleServerRpc } from "auxiliaries/chibi_rpc/server.ts";
import { raiseError } from "auxiliaries/utils/error_util.ts";
import {
  createPostHandler,
  readRequestBody,
  responseJson,
} from "shared/system/route_helper.ts";

export const action = createPostHandler(async ({ request, params }) => {
  const op = params.op;
  if (!op) raiseError(`rpc op undefined`);
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(request);
  if (!loginUserClue) raiseError(`login required`);
  const payload = await readRequestBody(request);
  const context: AppRpcContext = { loginUserId: loginUserClue.userId };
  const result = await handleServerRpc(
    appRpcRouter,
    op,
    payload,
    context,
    false
  );
  return responseJson(result ?? {});
});
