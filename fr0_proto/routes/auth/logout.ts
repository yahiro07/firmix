import { defineRoute } from "$fresh/src/server/defines.ts";
import { serverShell } from "~/be/server_shell.ts";

export const handler = defineRoute(async () => {
  await serverShell.userService.logout();
  return Response.redirect("/");
});
