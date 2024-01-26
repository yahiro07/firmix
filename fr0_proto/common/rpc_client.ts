import { createRpcClient } from "~/aux/chibi_rpc/client.ts";
import { AppRpcSignatures } from "~/base/types_rpc.ts";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
