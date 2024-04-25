import { createLoader, createPage } from "@mx/web-kfx/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";
import { clientStorageImpl } from "web-kfx/app/central/system/client_storage_impl";
import { LocalProjectPage } from "web-kfx/app/islands/LocalProjectPage";

export const loader = createLoader(async ({ request }) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(request);
  return { loggedIn };
});

export default createPage(() => {
  const { loggedIn } = useLoaderData<typeof loader>();
  return <LocalProjectPage loggedIn={loggedIn} />;
});
