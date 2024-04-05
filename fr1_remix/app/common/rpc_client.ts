import { createRpcClient } from "~/auxiliaries/chibi_rpc/client.ts";
import { AppRpcSignatures } from "~/base/types_rpc.ts";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
