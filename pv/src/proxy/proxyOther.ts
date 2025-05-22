import type { Context } from "elysia";
import { getJsInjectImport } from "../utils/jsInject";

export const handleProxyOther = async (ctx: Context) => {
  console.log(ctx.headers.referer);

  // Super scuffed way to get original origin
  // ex. http://localhost:4001/proxy/asset?url=https://example.com/entry/app.js
  const refererHeader = ctx.headers?.referer;
  // ex. http://localhost:4001/proxy/asset?url=https://example.com/entry/app.js
  const refererHeaderUrl = new URL(refererHeader || "");
  // ex. https://example.com/entry/app.js
  const originalUrlParam = refererHeaderUrl.searchParams.get("url");
  // ex. https://example.com/entry/app.js
  const originalUrl = new URL(originalUrlParam || "");

  if (!ctx.params["*"]) return "";

  const resourceUrl = originalUrl?.origin;
  const resourcePath = ctx.params["*"];
  console.log(`${resourceUrl}/${resourcePath}`);

  if (!resourceUrl) return "";

  // Base URLs
  const ASSET_BASE_URL = `${process.env.HOST}/proxy/asset`;

  // Fetch the resource
  const response = await fetch(`${resourceUrl}/${resourcePath}`, {
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
      //const injection = "";

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
    return "Failed to fetch resource";
  }
};
