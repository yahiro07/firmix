import { defineConfig } from "vocs";

export default defineConfig({
  title: "Firmix ドキュメント",
  sidebar: [
    { text: "Firmixについて", link: "/summary" },
    { text: "ファームウェアの書き込み", link: "/tutorial" },
    {
      text: "開発者向け情報",
      collapsed: false,
      items: [
        { text: "開発の概要", link: "/project/summary" },
        { text: "フォルダ構成", link: "/project/structure" },
        { text: "動的設定の仕組み", link: "/project/patching" },
        { text: "メタデータファイル", link: "/project/metadata" },
        { text: "ビルド", link: "/project/build" },
        { text: "ローカル開発", link: "/project/local-dev" },
        { text: "サーバ上でのビルド", link: "/project/ci" },
        { text: "デバッグの仕方", link: "/project/patching-debug" },
      ],
    },
  ],
});
