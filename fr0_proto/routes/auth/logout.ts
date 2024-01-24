import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/be/server_shell.ts";
import { clientStorageImpl } from "~/be/system/client_storage_impl.ts";
import { responseRedirect } from "~/system/route_helper.ts";

export const handler = defineRoute(async () => {
  const storageJob = await serverShell.userService.logout();
  const res = responseRedirect("/");
  clientStorageImpl.processCookieOutputJob(res, storageJob);
  return res;
});
