import { createRpcClient } from "@mx/auxiliaries/chibi_rpc/client";
import { AppRpcSignatures } from "../base/types_rpc";

export const rpcClient = createRpcClient<AppRpcSignatures>("/api/rpc", {
  commonErrorHandler(errorMessage) {
    alert(errorMessage);
  },
});
