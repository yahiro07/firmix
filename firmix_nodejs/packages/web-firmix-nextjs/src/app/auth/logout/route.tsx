import { serverShell } from "@mx/web-firmix-nextjs/src/central/server_shell";
import { clientStorageImpl } from "@mx/web-firmix-nextjs/src/central/system/client_storage_impl";
import { createGetHandler, responseRedirect } from "../../route_helper";

export const GET = createGetHandler(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(storageJob);
  return res;
});
