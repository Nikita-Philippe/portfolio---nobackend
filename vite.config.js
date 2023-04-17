import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      css: (css) => {
        css.write("public/bundle.css");
      },
    })
  ],
  server: {
    proxy: {
      "/mail-check": {
        target: "https://api.campaignkit.cc/v1/email/validate",
        changeOrigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MV_API_KEY}`,
        },
        rewrite: (path) => path.replace(/^\/mail-check/, ""),
        secure: true,
        //proxyTimeout: 1500,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(proxyRes);
          });
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
