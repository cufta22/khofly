import type { Context } from "elysia";
import * as ratesSvc from "./services/rates.service";
import * as lyricsSvc from "./services/lyrics.service";
import * as weatherSvc from "./services/weather.service";
import * as downlaodSvc from "./services/download.service";
import * as ipSvc from "./services/ip.service";
import * as geocodingSvc from "./services/geocoding.service";
import * as faviconSvc from "./services/favicon.service";
import * as aiChatSvc from "./services/aiChat.service";
import * as aiConfigSvc from "./services/aiConfig.service";
import * as instancesSvc from "./services/instances.service";
import * as proxyViewSvc from "./services/proxyView.service";
import * as proxyResourcesSvc from "./services/proxyResources.service";
import * as pvProxySvc from "./services/pvProxy.service";

// GET - /rates
export const handleRates = async (ctx: Context) => {
  return await ratesSvc.handleGetRates(ctx);
};

// GET - /lyrics
export const handleLyrics = async (ctx: Context) => {
  return await lyricsSvc.handleGetLyrics(ctx);
};

// GET - /geocoding
export const handleGeocoding = async (ctx: Context) => {
  return await geocodingSvc.handleGetGeocoding(ctx);
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

// GET - /favicon
export const handleFavicon = async (ctx: Context) => {
  return await faviconSvc.handleFavicon(ctx);
};

// GET - /instances
export const handleInstances = async (ctx: Context) => {
  return await instancesSvc.handleGetInstances(ctx);
};

// GET - /ai/config
export const handleAIConfig = async (ctx: Context) => {
  return await aiConfigSvc.handleAIConfig(ctx);
};
// POST - /ai/chat
export const handleAIChat = async (ctx: Context) => {
  return await aiChatSvc.handleAIChat(ctx);
};

// GET - /proxy/view
export const handleProxyView = async (ctx: Context) => {
  return await proxyViewSvc.handleProxyView(ctx);
};
// GET - /proxy/resource
export const handleProxyResources = async (ctx: Context) => {
  return await proxyResourcesSvc.handleProxyResources(ctx);
};

// GET - /pv/proxy
export const handlePvProxy = async (ctx: Context) => {
  return await pvProxySvc.handlePrivateView(ctx);
};
