import { Partial } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";
import { ResinCssEmitter, ResinCssGlobalStyle } from "resin";
import { fallbackValues } from "~/base/fallback_values.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { globalStyle } from "~/common/global_style.ts";
import { SiteContextValue } from "~/common/site_context.ts";
import { CssFrameworkAssetsImporter } from "~/components/CommonControls.tsx";
import { SiteContextProvider } from "~/islands/SiteContextProvider.tsx";

// deno-lint-ignore require-await
export default async function App(req: Request, ctx: FreshContext) {
  const pagePath = new URL(req.url).pathname;
  const loginUser = clientStorageImpl.readCookieLoginUserClue(req);
  const coactiveState =
    clientStorageImpl.readCookieCoactiveState(req) ??
    fallbackValues.coactiveState;
  const siteContextValue: SiteContextValue = {
    pagePath,
    loginUser,
    coactiveState,
  };
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Firmix</title>
        <ResinCssGlobalStyle css={globalStyle} />
        <ResinCssEmitter />
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <CssFrameworkAssetsImporter />
      </head>
      <body f-client-nav>
        <SiteContextProvider value={siteContextValue}>
          <Partial name="body">
            <ctx.Component />
          </Partial>
        </SiteContextProvider>
      </body>
    </html>
  );
}
