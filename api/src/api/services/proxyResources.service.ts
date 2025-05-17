import type { Context } from "elysia";

// GET - /proxy/resources
export const handleProxyResources = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const resourceUrl = searchParams.get("url") || "";

  if (!resourceUrl) {
    throw ctx.error(400, "Resource URL is required");
  }

  // Fetch the resource
  const response = await fetch(resourceUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      Referrer: "http://localhost:4000/proxy/resources",
      Origin: "http://localhost:4000/proxy/resources",
      Host: "http://localhost:4000/proxy/resources",
    },
  });

  // If we got a successful response
  if (response.ok) {
    // Get the content type
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Get the favicon data as ArrayBuffer
    const resourceData = await response.arrayBuffer();

    // Set appropriate headers
    ctx.set.headers["content-type"] = contentType;
    ctx.set.headers["cache-control"] = "public, max-age=86400"; // Cache for 24 hours

    // Send the resource data
    return Buffer.from(resourceData);
  } else {
    throw ctx.error(400, "Failed to fetch resource");
  }
};
