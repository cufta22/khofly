import { Preset, vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// Hosting providers
import { vercelPreset } from "@vercel/remix/vite";

installGlobals();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const loadedPresets: Preset[] = [];

  if (env.HOST_TARGET === "vercel") {
    loadedPresets.push(vercelPreset());
  }

  return {
    server: {
      port: 3000,
    },
    plugins: [
      remix({
        ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.scss", "**/*.css.map"],
        presets: loadedPresets,
      }),
      tsconfigPaths(),
    ],
    // Scss stuff
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          includePaths: [path.join(__dirname, "src/styles")],
        },
      },
    },
    // ENV variables
    define: {
      "process.env.HOST": JSON.stringify(env.HOST),
      "process.env.SEARXNG_URL": JSON.stringify(env.SEARXNG_URL),
      "process.env.SEARXNG_URL_EU1": JSON.stringify(env.SEARXNG_URL_EU1),
      "process.env.SEARXNG_URL_US1": JSON.stringify(env.SEARXNG_URL_US1),
      "process.env.NOMINATIM_URL": JSON.stringify(env.NOMINATIM_URL),
      "process.env.IS_SELF_HOST": JSON.stringify(env.IS_SELF_HOST),
      "process.env.APP_NAME": JSON.stringify(env.APP_NAME),
    },

    // Testing for Vercel edge functions
    // ssr: {
    //   noExternal: true,
    // },
  };
});
