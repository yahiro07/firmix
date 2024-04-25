import {
  createLoader,
  createPage,
} from "@mx/web-firmix/app/system/route_helper";
import { useLoaderData } from "@remix-run/react";

export const loader = createLoader(async ({ params }) => {
  params.name;
});

export default createPage(() => {
  const { name } = useLoaderData<typeof loader>();
  return <div>Hello {name}</div>;
});
