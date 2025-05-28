import type { Context } from "elysia";
import { kv_Actions } from "../kv";
import { handleProcessHtml } from "./processHtml";
import { handleProcessAssets } from "./processAssets";
import { extractParams } from "../utils/extractParams";

export const handleProxy = async (ctx: Context) => {
  const { searchParams, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  // For <a href="..." />
  const { origin: targetOrigin } = new URL(targetUrl);
  const reqOrigin = ctx.request.headers?.get("origin");

  // For assets loaded after initial html
  const fullParams = ctx?.params?.["*"] || ""; // {uuid}/path/asset.js
  const { targetUUID, targetAssetPath } = extractParams(fullParams);

  if (!protocol || !host) {
    throw ctx.status(400, "Invalid URL");
  }
  console.log(fullParams);
  console.log(targetUUID);
  console.log(targetUrl);

  // Set KV UUID for initial domain
  if (targetUrl) {
    kv_Actions.set({ key: targetUUID, value: targetUrl });
  }

  // Base URLs
  const ASSET_BASE_URL = `${process.env.HOST}/proxy`;
  const ANCHOR_BASE_URL = `${reqOrigin}/pv/proxy`;

  // -------------------------------------------------------------------------
  // Handle initial html request
  // -------------------------------------------------------------------------
  if (targetUrl) {
    const { contentType, html } = await handleProcessHtml({
      targetUrl,
      targetOrigin,
      targetUUID,
      ASSET_BASE_URL,
      ANCHOR_BASE_URL,
    });

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;

    return html;
  }

  // -------------------------------------------------------------------------
  // Handle subsequent asset requests
  // -------------------------------------------------------------------------
  if (targetUUID && targetAssetPath) {
    const { contentType, asset } = await handleProcessAssets({
      targetUUID,
      targetAssetPath,
      ASSET_BASE_URL,
    });

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;
    ctx.set.headers["cache-control"] = "public, max-age=86400"; // Cache for 24 hours

    return asset;
  }
};
