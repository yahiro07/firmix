import { FreshContext } from "$fresh/server.ts";
import { MainLayout } from "~/islands/MainLayout.tsx";

// deno-lint-ignore require-await
export default async function BaseLayout(req: Request, ctx: FreshContext) {
  return (
    <MainLayout>
      <ctx.Component />
    </MainLayout>
  );
}
