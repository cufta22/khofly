import { type PlatformProxy } from "wrangler";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
  NODE_ENV: string;
  HOST: string;
  SEARXNG_URL_EU1: string;
  SEARXNG_URL_US1: string;
  NOMINATIM_URL: string;
  OPEN_WEATHER_URL: string;
  OPEN_WEATHER_API_KEY: string;
  ANALYZE: string;
  IS_SELF_HOST: string;
  APP_NAME: string;
  HOST_TARGET: string;
  SEARXNG_URL_SELF_HOST: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
