import { clientStorageImpl } from "@m/web-firmix/central/system/client_storage_impl";
import { LocalProjectPage } from "@m/web-firmix/islands/LocalProjectPage.tsx";
import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";

export const loader = createLoader(async ({ request }) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(request);
  return { loggedIn };
});

export default createPage(() => {
  const { loggedIn } = useLoaderData<typeof loader>();
  return <LocalProjectPage loggedIn={loggedIn} />;
});
