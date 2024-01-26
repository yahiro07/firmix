import { FreshContext } from "$fresh/server.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { MainLayout } from "~/islands/MainLayout.tsx";

// deno-lint-ignore require-await
export default async function BaseLayout(req: Request, ctx: FreshContext) {
  const loginUser = clientStorageImpl.readCookieLoginUserClue(req);
  return (
    <MainLayout loginUser={loginUser}>
      <ctx.Component />
    </MainLayout>
  );
}
