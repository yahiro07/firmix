import { serverShell } from "~/central/server_shell";
import { clientStorageImpl } from "~/central/system/client_storage_impl";
import { createGetHandler, responseRedirect } from "~/system/route_helper";

export const loader = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
