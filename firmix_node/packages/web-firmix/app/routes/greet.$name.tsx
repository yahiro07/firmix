import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";

export const loader = createLoader(async ({ params }) => {
  params.name;
});

export default createPage(() => {
  const { name } = useLoaderData<typeof loader>();
  return <div>Hello {name}</div>;
});
