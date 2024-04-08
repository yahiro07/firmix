import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    Inspect(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  build: { target: "esnext" },
  // server: {
  //   warmup: {
  //     clientFiles: [
  //       "./app/entry.client.tsx",
  //       "./app/root.tsx",
  //       "./app/routes/**/*",
  //     ],
  //   },
  // },
  // optimizeDeps: {
  //   include: ["./app/entry.client.tsx", "./app/root.tsx", "./app/routes/**/*"],
  // },
});
