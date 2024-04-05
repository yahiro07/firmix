import { defineRoute } from "$fresh/server.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { LocalProjectPage } from "~/islands/LocalProjectPage.tsx";

export default defineRoute((req) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(req);
  return <LocalProjectPage loggedIn={loggedIn} />;
});
