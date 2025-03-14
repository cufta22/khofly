import cors from "@elysiajs/cors";
import cron from "@elysiajs/cron";
import { Elysia } from "elysia";
import { CORS_OPTIONS, CRON_CLEAR_MEDIA, CRON_FETCH_RATES_OPTIONS, STATIC_OPTIONS } from "./config";
import * as router from "./api/router";
import staticPlugin from "@elysiajs/static";
import { middleware_Error } from "./middleware/error";

const app = new Elysia({ serve: { idleTimeout: 100 } })
  // Plugins
  .use(cors(CORS_OPTIONS))
  .use(staticPlugin(STATIC_OPTIONS))
  .use(cron(CRON_FETCH_RATES_OPTIONS)) // Updates rates file every hour
  .use(cron(CRON_CLEAR_MEDIA)) // Clear downloaded media every 30min

  // Middlewares
  .on("error", middleware_Error) // Handle errors

  .get("/", () => "Khofly API")

  .get("/rates", router.handleRates) // Fetch latest currency exchange rates
  .get("/lyrics", router.handleLyrics) // Fetch song lyrics by name
  .get("/weather", router.handleWeather) // Fetch weather data
  .get("/download", router.handleDownload) // Download media file

  .listen(4000);

console.log(`🦊 Khofly API is running at ${app.server?.hostname}:${app.server?.port}`);
