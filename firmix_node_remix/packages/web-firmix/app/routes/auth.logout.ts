import { serverShell } from "@m/web-firmix/central/server_shell";
import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl";
import { createGetHandler, responseRedirect } from "shared/system/route_helper";

export const loader = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
