import { clientStorageImpl } from "@mx/web-kfx/app/central/system/client_storage_impl";
import { LocalProjectPage } from "@mx/web-kfx/app/islands/LocalProjectPage";
import { createLoader, createPage } from "@mx/web-kfx/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";

export const loader = createLoader(async ({ request }) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(request);
  return { loggedIn };
});

export default createPage(() => {
  const { loggedIn } = useLoaderData<typeof loader>();
  return <LocalProjectPage loggedIn={loggedIn} />;
});
