import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
    },

    preview: {
      port: 3000,
    },

    plugins: [reactRouter(), tsconfigPaths()],

    // Fix tabler icons...
    resolve: {
      alias: {
        // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
        "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      },
    },

    // Scss stuff
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          quietDeps: true,
          loadPaths: [path.join(__dirname, "src/styles")],
        },
      },
    },

    // Fix too large files on build
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes("node_modules/.pnpm")) {
    //           return id
    //             .toString()
    //             .split("node_modules/.pnpm/")[1]
    //             .split("/")[0]
    //             .toString();
    //         }
    //       },
    //     },
    //   },
    // },

    // ENV variables
    define: {
      "process.env.HOST": JSON.stringify(env.HOST),
      "process.env.SEARXNG_URL_EU1": JSON.stringify(env.SEARXNG_URL_EU1),
      "process.env.SEARXNG_URL_US1": JSON.stringify(env.SEARXNG_URL_EU1),
      "process.env.API_URL_EU1": JSON.stringify(env.API_URL_EU1),
      "process.env.API_URL_US1": JSON.stringify(env.API_URL_EU1),
      "process.env.WORKER_URL": JSON.stringify(env.WORKER_URL),
      "process.env.NOMINATIM_URL": JSON.stringify(env.NOMINATIM_URL),
      "process.env.IS_SELF_HOST": JSON.stringify(env.IS_SELF_HOST),
      "process.env.APP_NAME": JSON.stringify(env.APP_NAME),
      "process.env.SEARXNG_URL_SELF_HOST": JSON.stringify(env.SEARXNG_URL_SELF_HOST),
    },

    // Testing for Vercel edge functions
    // ssr: {
    //   noExternal: true,
    // },
  };
});
