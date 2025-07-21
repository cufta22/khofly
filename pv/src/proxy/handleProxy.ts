import type { Context } from "elysia";
import { handleProcessHtml } from "./processHtml";
import { handleProcessAssets } from "./processAssets";
import { extractAssetParams } from "../utils/extractAssetParams";
import { createInitialKVPair } from "../utils/createInitialKVPair";

export const handleProxy = async (ctx: Context) => {
  const { searchParams, search, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  // For <a href="..." />
  const reqOrigin = ctx.request.headers?.get("origin");
  const reqReferrer = ctx.request.headers?.get("referer");

  // For assets loaded after initial html
  const assetPathWithParams = `${ctx.params?.["*"]}${search}`; // {uuid}/path/asset.js?...

  const { targetAssetUUID, targetAssetPath } = extractAssetParams(assetPathWithParams);

  if (!protocol || !host) {
    throw ctx.status(400, "Invalid URL");
  }

  // Base URLs
  const ASSET_BASE_URL = `${process.env.HOST}/proxy`;
  const API_BASE_URL = `${process.env.HOST}/api`;
  const ANCHOR_BASE_URL = reqOrigin ? `${reqOrigin}/pv/proxy` : `${reqReferrer}pv/proxy`;

  // -------------------------------------------------------------------------
  // Handle initial html request
  // -------------------------------------------------------------------------
  if (targetUrl) {
    console.log(ctx.request.headers);

    // Set KV UUID for initial domain
    const targetOrigin = new URL(targetUrl).origin; // Without any paths and params
    const targetHtmlUUID = createInitialKVPair(targetOrigin);

    const { contentType, html } = await handleProcessHtml({
      targetUrl,
      targetHtmlUUID,
      ANCHOR_BASE_URL,
      API_BASE_URL,
    });

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;

    return html;
  }

  // -------------------------------------------------------------------------
  // Handle subsequent asset requests
  // -------------------------------------------------------------------------
  if (targetAssetUUID && targetAssetPath) {
    const { contentType, asset } = await handleProcessAssets({
      targetAssetUUID,
      targetAssetPath,
      ASSET_BASE_URL,
    });

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;
    ctx.set.headers["cache-control"] = "public, max-age=86400"; // Cache for 24 hours

    return asset;
  }
};
