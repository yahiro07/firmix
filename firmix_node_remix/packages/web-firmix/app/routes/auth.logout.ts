import { createGetHandler, responseRedirect } from "shared/system/route_helper";
import { serverShell } from "~/central/server_shell";
import { clientStorageImpl } from "~/central/system/client_storage_impl";

export const loader = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
