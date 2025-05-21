import type { Context } from "elysia";
import { getJsInjectImport } from "../utils/jsInject";

export const handleProxyAssets = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const resourceUrl = searchParams.get("url") || "";

  if (!resourceUrl) return "";

  // Base URLs
  const ASSET_BASE_URL = `${process.env.HOST}/proxy/asset`;

  // Fetch the resource
  const response = await fetch(resourceUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    },
  });

  // If we got a successful response
  if (response.ok) {
    // Get the content type
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;
    ctx.set.headers["cache-control"] = "public, max-age=86400"; // Cache for 24 hours

    // -----------------------------------------------------------
    // Handle icons
    // -----------------------------------------------------------
    if (contentType.includes("application/octet-stream")) {
      // Get the asset data as ArrayBuffer
      const resourceData = await response.arrayBuffer();

      // Send the resource data
      return Buffer.from(resourceData);
    }

    // -----------------------------------------------------------
    // Handle JS files
    // -----------------------------------------------------------
    if (contentType.includes("application/javascript") || contentType.includes("text/javascript")) {
      const jsContent = await response.text();

      const injection = getJsInjectImport();

      const injectedJsContent = injection + jsContent;

      // Regex to find import("*");
      const importRegex = /(import\s*\(\s*["'`])(https?:\/\/[^"')`]+)(["'`]\s*\))/gi;

      const modifiedJsContent = injectedJsContent.replace(importRegex, (match, p1, p2, p3) => {
        // p1 = import("
        // p2 = original url
        // p3 = ")
        const proxiedUrl = `${ASSET_BASE_URL}?url=${p2}`;

        return `${p1}${proxiedUrl}${p3}`;
      });

      return modifiedJsContent;
    }

    // -----------------------------------------------------------
    // Handle JSON
    // -----------------------------------------------------------
    if (contentType.includes("application/json")) {
      // Get the json data
      const resourceData = await response.json();

      // Send the resource data
      return resourceData;
    }

    // -----------------------------------------------------------
    // Handle other stuff
    // -----------------------------------------------------------

    const resourceData = await response.text();
    return resourceData;
  } else {
    throw ctx.status(400, "Failed to fetch resource");
  }
};
