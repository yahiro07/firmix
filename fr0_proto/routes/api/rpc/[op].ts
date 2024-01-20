import { handleServerRpc } from "~/aux/chibi_rpc/server.ts";
import { appRpcRouter } from "~/be/rpc_router.ts";
import { createPostHandler, readRequestBody } from "~/system/route_helper.ts";

export const handler = createPostHandler(async (req, ctx) => {
  const op = ctx.params.op;
  const payload = await readRequestBody(req);
  const result = await handleServerRpc(appRpcRouter, op, payload, {}, false);
  return Response.json(result ?? {});
});
