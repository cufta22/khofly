import type { Context } from "elysia";

import { handleProcessApi } from "./processAPI";
import { extractAssetParams } from "../utils/extractAssetParams";

export const handleApi = async (ctx: Context) => {
  const { searchParams, search, protocol, host } = new URL(ctx.request.url);

  const requestUrl = searchParams.get("url") || "";
  const requestMethod = searchParams.get("method") || "GET";

  // For assets loaded after initial html
  const assetPathWithParams = `${ctx.params?.["*"]}${search}`; // {uuid}/path/asset.js?...

  const { targetAssetUUID, targetAssetPath } = extractAssetParams(assetPathWithParams);

  if (!protocol || !host) {
    throw ctx.status(400, "Invalid URL");
  }

  // -------------------------------------------------------------------------
  // Handle API requests
  // -------------------------------------------------------------------------
  if (requestUrl) {
    const { contentType, response } = await handleProcessApi({
      reqMethod: requestMethod,
      reqUrl: requestUrl,
    });

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;

    return response;
  }
};
