import { handleServerRpc } from "@mx/auxiliaries/chibi_rpc/server";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { AppRpcContext } from "@mx/web-firmix-nextjs/src/base/types_rpc";
import { appRpcRouter } from "@mx/web-firmix-nextjs/src/central/rpc_router";
import { clientStorageImpl } from "@mx/web-firmix-nextjs/src/central/system/client_storage_impl";
import {
  createPostHandler,
  readRequestBody,
  responseJson,
} from "../../../route_helper";

export const POST = createPostHandler(async ({ request, params }) => {
  const op = params.op;
  if (!op) raiseError(`rpc op undefined`);
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue();
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
