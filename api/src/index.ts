import cors from "@elysiajs/cors";
import cron from "@elysiajs/cron";
import { Elysia, file } from "elysia";
import {
  CORS_OPTIONS,
  CRON_CLEAR_MEDIA,
  CRON_FETCH_RATES_OPTIONS,
  CRON_UPDATE_INSTANCES,
} from "./config";
import * as router from "./api/router";
import { middleware_Error } from "./middleware/error";
// import staticPlugin from "@elysiajs/static";

import packageJson from "../package.json";

const app = new Elysia({ serve: { idleTimeout: 100 } })
  // Plugins
  .use(cors(CORS_OPTIONS))
  // .use(staticPlugin(STATIC_OPTIONS)) // Borked sometimes
  .use(cron(CRON_FETCH_RATES_OPTIONS)) // Updates rates file
  .use(cron(CRON_CLEAR_MEDIA)) // Clear downloaded media
  .use(cron(CRON_UPDATE_INSTANCES)) // Update public instances

  // Middlewares
  .onError(middleware_Error) // Handle errors

  .get("/", () => `Khofly API v${packageJson.version}`)

  .get("/media/*", ({ params }) => file(`temp/media/${params["*"]}`)) // Download media files, temp fix for staticPlugin

  .get("/rates", router.handleRates) // Fetch latest currency exchange rates
  .get("/lyrics", router.handleLyrics) // Fetch song lyrics by name
  .get("/geocoding", router.handleGeocoding) // Fetch geocoding data
  .get("/weather", router.handleWeather) // Fetch weather data
  .get("/download", router.handleDownload) // Download media file
  .get("/ip", router.handleIP) // Get IP from headers
  .get("/favicon", router.handleFavicon) // Fetch website favicon
  .get("/instances", router.handleInstances) // Fetch public instances
  .get("/ai/config", router.handleAIConfig) // Fetch available models
  .post("/ai/chat", router.handleAIChat) // Chat with selected model

  .listen(process.env.PORT || 4000);

console.log(`🦊 Khofly API is running at ${app.server?.hostname}:${app.server?.port}`);
