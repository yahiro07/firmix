import { serverShell } from "~/be/server_shell.ts";
import { clientStorageImpl } from "~/be/system/client_storage_impl.ts";
import { createGetHandler, responseRedirect } from "~/system/route_helper.ts";

export const handler = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});