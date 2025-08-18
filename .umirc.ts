import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  favicons: ["https://domain.com/favicon.ico"],
  icons: { autoInstall: {} },
  conventionRoutes: {
    exclude: [/\/component\//],
  },
});
