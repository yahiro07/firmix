import { serverShell } from "@mx/web-firmix/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix/app/central/system/client_storage_impl";
import {
  createGetHandler,
  responseRedirect,
} from "@mx/web-firmix/app/system/route_helper";

export const loader = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
