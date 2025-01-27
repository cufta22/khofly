import { CronConfig } from "@elysiajs/cron";
import { cron_fetchRates } from "./cron/fetchRates";
import path from "path";

export const __dirname = new URL(".", import.meta.url).pathname;

export const STATIC_OPTIONS = {
  assets: path.join(__dirname, `/../temp`),
  prefix: "/temp",
};

const whitelist = [
  "http://localhost:3000",
  "https://staging.khofly.com",
  "https://khofly.com",
];

export const CORS_OPTIONS = {
  origin(req: Request) {
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
  pattern: "30 * * * *", // every hour at 0 minutes
  run() {
    cron_fetchRates();
  },
};
