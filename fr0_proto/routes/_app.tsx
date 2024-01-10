import { type PageProps } from "$fresh/server.ts";
import { ResinCssEmitter, ResinCssGlobalStyle } from "~/aux/resin/resin_css.ts";
import { globalStyle } from "~/common/global_style.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fr0_proto</title>
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
        <Component />
      </body>
    </html>
  );
}
