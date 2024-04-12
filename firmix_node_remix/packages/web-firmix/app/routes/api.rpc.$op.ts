import { handleServerRpc } from "auxiliaries/chibi_rpc/server";
import { raiseError } from "auxiliaries/utils/error_util";
import {
  createPostHandler,
  readRequestBody,
  responseJson,
} from "shared/system/route_helper";
import { AppRpcContext } from "web-firmix/app/base/types_rpc";
import { appRpcRouter } from "web-firmix/app/central/rpc_router";
import { clientStorageImpl } from "web-firmix/app/central/system/client_storage_impl";

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
