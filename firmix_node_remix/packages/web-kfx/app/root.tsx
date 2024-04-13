import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { fallbackValues } from "web-kfx/app/base/fallback_values";
import { clientStorageImpl } from "web-kfx/app/central/system/client_storage_impl";
import { SiteContextValue } from "web-kfx/app/common/site_context";
import { MainLayout } from "web-kfx/app/islands/MainLayout";
import { SiteContextProvider } from "web-kfx/app/islands/SiteContextProvider";
import styles from "./root.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const pagePath = new URL(request.url).pathname;
  const loginUser = clientStorageImpl.readCookieLoginUserClue(request) ?? null;
  const coactiveState =
    clientStorageImpl.readCookieCoactiveState(request) ??
    fallbackValues.coactiveState;
  const siteContextValue: SiteContextValue = {
    pagePath,
    loginUser,
    coactiveState,
  };
  return { siteContextValue };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Firmix</title>
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteContextProvider value={data.siteContextValue}>
          {children}
        </SiteContextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
