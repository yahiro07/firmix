import { AppRpcSignatures } from "@m/web-firmix/base/types_rpc.ts";
import { createRpcClient } from "auxiliaries/chibi_rpc/client.ts";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
