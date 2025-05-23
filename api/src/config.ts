import type { CronConfig } from "@elysiajs/cron";
import { cron_fetchRates } from "./cron/fetchRates";
import path from "node:path";
import { cron_clearMedia } from "./cron/clearMedia";
import { cron_updateInstances } from "./cron/updateInstances";

export const __dirname = new URL(".", import.meta.url).pathname;

export const IS_SELF_HOST = process.env.IS_SELF_HOST === "1";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const STATIC_OPTIONS = {
  assets: path.join(__dirname, `/../temp/media`),
  prefix: "/media",
  noCache: true,
};

const whitelist = IS_SELF_HOST
  ? process.env.WEB_CLIENT_URL?.split(", ")
  : IS_DEVELOPMENT
  ? ["http://localhost:3000"]
  : ["https://staging.khofly.com", "https://khofly.com"];

export const CORS_OPTIONS = {
  origin(req: Request) {
    // Make sure that whitelist array exists
    if (!whitelist?.length) return false;

    const found = !!whitelist.find((d) => d === req.headers.get("origin"));

    return found;
  },
  methods: ["GET", "OPTIONS"] as any,
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

export const CRON_FETCH_RATES_OPTIONS: CronConfig = {
  name: "fetch rates",
  // pattern: '* * * * *', // every 1 min, for testing
  pattern: "0 * * * *", // every hour at 0 minutes
  run() {
    cron_fetchRates();
  },
};

export const CRON_CLEAR_MEDIA: CronConfig = {
  name: "clean media folder",
  // pattern: "* * * * *", // every 1 min, for testing
  pattern: "0 * * * *", // every hour at 0 minutes
  run() {
    cron_clearMedia();
  },
};

export const CRON_UPDATE_INSTANCES: CronConfig = {
  name: "update public instances",
  // pattern: "* * * * *", // every 1 min, for testing
  pattern: "0 */12 * * *", // every 12 hours at 0 minutes
  run() {
    cron_updateInstances();
  },
};
