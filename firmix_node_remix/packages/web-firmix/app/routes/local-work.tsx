import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";
import { clientStorageImpl } from "web-firmix/app/central/system/client_storage_impl";
import { LocalProjectPage } from "web-firmix/app/islands/LocalProjectPage.tsx";

export const loader = createLoader(async ({ request }) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(request);
  return { loggedIn };
});

export default createPage(() => {
  const { loggedIn } = useLoaderData<typeof loader>();
  return <LocalProjectPage loggedIn={loggedIn} />;
});
