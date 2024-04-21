import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Firmix",
  description: "マイコンのファームウェアの投稿サイトです。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/iconfinder/294397_high tech_business_chip_hardware_digital_icon.png",
    nav: [
      { text: "ホーム", link: "/" },
      { text: "ガイド", link: "/summary" },
    ],

    sidebar: [
      {
        text: "概要",
        collapsed: false,
        items: [
          { text: "Firmixについて", link: "/summary" },
          { text: "サイトの使い方", link: "/how-to-use" },
        ],
      },
      {
        text: "開発者向け情報",
        collapsed: false,
        items: [{ text: "フォルダ構成", link: "/project/structure" }],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/yahiro07/firmix" },
    ],
  },
});
