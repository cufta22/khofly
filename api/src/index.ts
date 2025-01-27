import cors from "@elysiajs/cors";
import cron from "@elysiajs/cron";
import { Elysia } from "elysia";
import { CORS_OPTIONS, CRON_FETCH_RATES_OPTIONS } from "./config";
import * as router from "./api/router";

const app = new Elysia()
  // Plugins
  .use(cors(CORS_OPTIONS))
  .use(cron(CRON_FETCH_RATES_OPTIONS)) // Updates rates file every hour

  .get("/", () => "Open Exchange Rates data API")
  .get("/rates", router.handleRates) // Fetch latest currency exchange rates
  .get("/lyrics", router.handleLyrics) // Fetch song lyrics by name
  .get("/weather", router.handleWeather) // Fetch weather data

  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
