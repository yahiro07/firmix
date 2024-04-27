import { serverShell } from "@mx/web-kfx/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-kfx/app/central/system/client_storage_impl";
import {
  createGetHandler,
  responseRedirect,
} from "@mx/web-kfx/app/system/route_helper";

export const loader = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
