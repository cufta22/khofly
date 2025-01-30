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
    return ["/privacy", "/changelog", "/docs"];
  },
} satisfies Config;
