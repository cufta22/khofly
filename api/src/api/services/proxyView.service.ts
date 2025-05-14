import type { Context } from "elysia";
import { parse } from "node-html-parser";

// GET - /proxy/view
export const handleProxyView = async (ctx: Context) => {
  const { searchParams, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  if (!targetUrl) {
    throw ctx.error(400, "URL is required");
  }

  // Security check: prevent server-side request forgery
  if (!protocol || !host) {
    throw ctx.error(400, "Invalid URL");
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

    // Process HTML content
    const root = parse(htmlData);

    // Remove scripts and tracking elements
    const elementsToRemove = [
      // ...root.querySelectorAll("script"),
      ...root.querySelectorAll("iframe"),
      ...root.querySelectorAll('meta[http-equiv="refresh"]'),
      // Tracking pixels
      ...root.querySelectorAll('img[width="1"][height="1"], img[width="0"][height="0"]'),
    ];
    for (const element of elementsToRemove) {
      element.remove();
    }

    // Replace URLs in anchor tags
    const links = root.querySelectorAll("a");
    for (const link of links) {
      const href = link.getAttribute("href");
      if (href) {
        try {
          let absoluteUrl = href;
          if (!href.startsWith("http://") && !href.startsWith("https://")) {
            absoluteUrl = new URL(href, targetUrl).href;
          }
          link.setAttribute("href", `/proxy?url=${encodeURIComponent(absoluteUrl)}`);
          link.setAttribute("target", `_parent`);
        } catch (e) {
          // Invalid URL, leave as is
        }
      }
    }

    // Replace URLs in images, CSS, etc.
    const elements = root.querySelectorAll("img, link, script");
    for (const elem of elements) {
      const srcAttr = elem.tagName.toLowerCase() === "link" ? "href" : "src";
      const src = elem.getAttribute(srcAttr);
      if (src && !src.startsWith("data:")) {
        try {
          let absoluteSrc = src;
          if (!src.startsWith("http://") && !src.startsWith("https://")) {
            absoluteSrc = new URL(src, targetUrl).href;
          }
          elem.setAttribute(
            srcAttr,
            `http://${process.env.HOST}/proxy/resource?url=${encodeURIComponent(absoluteSrc)}`
          );
        } catch (e) {
          // Invalid URL, leave as is
        }
      }
    }

    // Return processed HTML
    return root.toString();
  } else {
    // For non-HTML content (images, PDFs, etc.), pass through
    const otherData = await response.text();

    return otherData;
  }
};
