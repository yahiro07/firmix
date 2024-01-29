import { FreshContext } from "$fresh/server.ts";
import { ResinCssEmitter, ResinCssGlobalStyle } from "resin";
import { globalStyle } from "~/common/global_style.ts";

// deno-lint-ignore require-await
export default async function App(_req: Request, ctx: FreshContext) {
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
          href="https://fonts.googleapis.com/css2?family=M+PLUS+2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ctx.Component />
      </body>
    </html>
  );
}
