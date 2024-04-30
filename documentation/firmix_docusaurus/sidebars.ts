import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    "how-to-use",
    {
      type: "category",
      label: "開発者向け情報",
      items: [
        "project/pages",
        "project/structure",
        "project/metadata",
        "project/local-dev",
        "project/automation",
      ],
      collapsed: false,
      link: { type: "generated-index" },
    },
  ],
};

export default sidebars;
