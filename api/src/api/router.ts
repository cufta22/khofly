import type { Context } from "elysia";
import * as ratesSvc from "./services/rates.service";
import * as lyricsSvc from "./services/lyrics.service";
import * as weatherSvc from "./services/weather.service";
import * as downlaodSvc from "./services/download.service";
import * as ipSvc from "./services/ip.service";

// GET - /rates
export const handleRates = async (ctx: Context) => {
  return await ratesSvc.handleGetRates(ctx);
};

// GET - /lyrics
export const handleLyrics = async (ctx: Context) => {
  return await lyricsSvc.handleGetLyrics(ctx);
};

// GET - /weather
export const handleWeather = async (ctx: Context) => {
  return await weatherSvc.handleGetWeather(ctx);
};

// GET - /download
export const handleDownload = async (ctx: Context) => {
  return await downlaodSvc.handleDownload(ctx);
};

// GET - /ip
export const handleIP = async (ctx: Context) => {
  return await ipSvc.handleGetIP(ctx);
};
