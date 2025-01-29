import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  future: {
    //  unstable_optimizeDeps: true,
  },

  // return a list of URLs to prerender at build time
  async prerender() {
    return [
      "/privacy",

      "/changelog",

      "/docs",
      "/docs/ai-answers",
      "/docs/private-search",
      "/docs/custom-searxng",
      "/docs/internationalization",
      "/docs/site-data",
      "/docs/self-host-searxng",
      "/docs/self-host-ai-worker",
      "/docs/self-host-khofly",
      "/docs/self-host-khofly-api",
      "/docs/3rd-party-weather",
      "/docs/3rd-party-currency",
    ];
  },
} satisfies Config;
