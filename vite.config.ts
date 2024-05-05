import {
  Preset,
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// import { installGlobals } from "@remix-run/node";

// Hosting providers
// import { vercelPreset } from "@vercel/remix/vite";

// installGlobals({
//   nativeFetch: true,
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const loadedPresets: Preset[] = [];

  // if (env.HOST_TARGET === "vercel") {
  //   loadedPresets.push(vercelPreset());
  // }

  return {
    server: {
      port: 3000,
    },

    plugins: [
      env.HOST_TARGET === "cloudflare" && remixCloudflareDevProxy(),

      remix({
        ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.scss", "**/*.css.map"],
        presets: loadedPresets,
        future: {
          unstable_singleFetch: true,
        },
      }),

      tsconfigPaths(),
    ].filter(Boolean),

    // Scss stuff
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          includePaths: [path.join(__dirname, "src/styles")],
        },
      },
    },

    // Fix too large files on build
    build: {
      rollupOptions: {
        plugins: [
          env.ANALYZE === "1" &&
            visualizer({
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
        ].filter(Boolean),
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/.pnpm")) {
              return id
                .toString()
                .split("node_modules/.pnpm/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },

    // ENV variables
    // define: {
    //   "process.env.HOST": JSON.stringify(env.HOST),
    //   "process.env.SEARXNG_URL_EU1": JSON.stringify(env.SEARXNG_URL_EU1),
    //   "process.env.SEARXNG_URL_US1": JSON.stringify(env.SEARXNG_URL_US1),
    //   "process.env.NOMINATIM_URL": JSON.stringify(env.NOMINATIM_URL),
    //   "process.env.IS_SELF_HOST": JSON.stringify(env.IS_SELF_HOST),
    //   "process.env.APP_NAME": JSON.stringify(env.APP_NAME),
    //   "process.env.SEARXNG_URL_SELF_HOST": JSON.stringify(
    //     env.SEARXNG_URL_SELF_HOST
    //   ),
    // },

    // Testing for Vercel edge functions
    // ssr: {
    //   noExternal: true,
    // },
  };
});
