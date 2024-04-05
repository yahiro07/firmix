import { useLoaderData } from "@remix-run/react";
import { clientStorageImpl } from "~/central/system/client_storage_impl";
import { LocalProjectPage } from "~/islands/LocalProjectPage.tsx";
import { createLoader, createPage } from "~/system/route_helper";

export const loader = createLoader(async ({ request }) => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue(request);
  return { loggedIn };
});

export default createPage(() => {
  const { loggedIn } = useLoaderData<typeof loader>();
  return <LocalProjectPage loggedIn={loggedIn} />;
});
