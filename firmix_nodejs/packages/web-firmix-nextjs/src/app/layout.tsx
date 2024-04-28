import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fallbackValues } from "../base/fallback_values";
import { clientStorageImpl } from "../central/system/client_storage_impl";
import { SiteContextValue } from "../common/site_context";
import { MainLayout } from "../screens/MainLayout";
import { SiteContextProvider } from "../screens/SiteContextProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Firmix",
  description: "電子工作の作品とファームウェアの投稿サイトです。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginUser = clientStorageImpl.readCookieLoginUserClue() ?? null;
  const coactiveState =
    clientStorageImpl.readCookieCoactiveState() ?? fallbackValues.coactiveState;
  const siteContextValue: SiteContextValue = {
    pagePath: "__dummy",
    loginUser,
    coactiveState,
  };

  return (
    <html lang="en">
      <head>
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
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SiteContextProvider value={siteContextValue}>
            <MainLayout>{children}</MainLayout>
          </SiteContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
