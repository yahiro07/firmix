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
        <title>firmix proto</title>
        <link rel="stylesheet" href="/styles.css" />
        <ResinCssGlobalStyle css={globalStyle} />
        <ResinCssEmitter />
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=M+PLUS+2&family=Murecho&family=Sawarabi+Gothic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ctx.Component />
      </body>
    </html>
  );
}
