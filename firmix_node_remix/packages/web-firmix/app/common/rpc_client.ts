import { createRpcClient } from "auxiliaries/chibi_rpc/client";
import { AppRpcSignatures } from "web-firmix/app/base/types_rpc";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
