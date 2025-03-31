import type { Context } from "elysia";

export type IFaviconAPI = "duckduckgo" | "google" | "favicone";

const RESOLVERS = {
  duckduckgo: (url: string) => `https://icons.duckduckgo.com/ip3/${url}.ico`,
  // duckduckgo: (url:string) => `https://external-content.duckduckgo.com/ip3/${url}.ico`,
  google: (url: string) => `https://www.google.com/s2/favicons?domain=${url}&sz=64`,
  favicone: (url: string) => `https://favicone.com/${url}?s=64`,
};

// GET - /favicon
export const handleFavicon = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const url = searchParams.get("url") || "";
  const resolver = (searchParams.get("resolver") as IFaviconAPI) || "duckduckgo";

  if (!url) {
    throw ctx.error(400, "URL is required!");
  }

  // Validate URL format
  const urlRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  if (!urlRegex.test(url)) {
    throw ctx.error(400, "Invalid URL format!");
  }

  // Construct the DuckDuckGo favicon URL
  const faviconUrl = RESOLVERS[resolver](url);

  try {
    // Fetch the favicon
    const response = await fetch(faviconUrl, {
      method: "GET",
    });

    // If we got a successful response
    if (response.ok) {
      // Get the content type
      const contentType = response.headers.get("content-type") || "image/x-icon";

      // Get the favicon data as ArrayBuffer
      const faviconData = await response.arrayBuffer();

      // Set appropriate headers
      ctx.set.headers["content-type"] = contentType;
      ctx.set.headers["cache-control"] = "public, max-age=86400"; // Cache for 24 hours

      // Send the favicon data
      return Buffer.from(faviconData);
    } else {
      throw ctx.error(400, "Failed to fetch favicon");
    }
  } catch (error) {}
};
