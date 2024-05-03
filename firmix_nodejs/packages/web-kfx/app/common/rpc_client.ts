import { createRpcClient } from "@mx/auxiliaries/chibi_rpc/client";
import { AppRpcSignatures } from "@mx/web-kfx/app/base/types_rpc";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
