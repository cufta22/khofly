import type { Context } from "elysia";
import * as ratesSvc from "./services/rates.service";
import * as lyricsSvc from "./services/lyrics.service";
import * as weatherSvc from "./services/weather.service";
import * as downlaodSvc from "./services/download.service";

// GET - /rates
export const handleRates = async (ctx: Context) => {
  try {
    return await ratesSvc.handleGetRates(ctx);
  } catch (error) {}
};

// GET - /lyrics
export const handleLyrics = async (ctx: Context) => {
  try {
    return await lyricsSvc.handleGetLyrics(ctx);
  } catch (error) {}
};

// GET - /weather
export const handleWeather = async (ctx: Context) => {
  try {
    return await weatherSvc.handleGetWeather(ctx);
  } catch (error) {}
};

// GET - /download
export const handleDownload = async (ctx: Context) => {
  try {
    return await downlaodSvc.handleDownload(ctx);
  } catch (error) {}
};
