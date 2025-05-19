import type { Context } from "elysia";
import { parse } from "node-html-parser";
import { isTrackingScript } from "./utils/proxy/isTrackingScript";
import { handleProcessHTML } from "./utils/proxy/processHtml";

// GET - /pv/proxy
export const handlePrivateView = async (ctx: Context) => {
  const { searchParams, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  // Check for url param
  if (!targetUrl) {
    throw ctx.status(400, "URL is required");
  }

  const { origin: targetOrigin } = new URL(targetUrl || "");
  const reqOrigin = ctx.request.headers?.get("origin");

  // Security check: prevent server-side request forgery
  if (!protocol || !host) {
    throw ctx.status(400, "Invalid URL");
  }

  // Don't send cookies or other identifying information
  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      DNT: "1",
      Referer: `${protocol}//${host}`,
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
  });

  // Determine content type
  const contentType = response.headers.get("content-type") || "text/html";
  ctx.set.headers["content-type"] = contentType;

  if (contentType.includes("text/html")) {
    const htmlData = await response.text();

    const processedHtml = handleProcessHTML({ htmlData, reqOrigin, targetOrigin, targetUrl });

    return processedHtml;
  } else {
    // For non-HTML content (images, PDFs, etc.), pass through
    const otherData = await response.text();

    return otherData;
  }
};
