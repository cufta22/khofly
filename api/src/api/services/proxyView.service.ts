import type { Context } from "elysia";
import { parse } from "node-html-parser";
import { isTrackingScript } from "./utils/isTrackingScript";

// GET - /proxy/view
export const handleProxyView = async (ctx: Context) => {
  const { searchParams, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  const { origin: targetOrigin } = new URL(targetUrl);
  const reqOrigin = ctx.request.headers?.get("origin");

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

    // Remove possible tracking elements
    const elementsToRemove = [
      ...root.querySelectorAll("iframe"),
      ...root.querySelectorAll('meta[http-equiv="refresh"]'),
      ...root.querySelectorAll('img[width="1"][height="1"], img[width="0"][height="0"]'),
    ];
    for (const element of elementsToRemove) {
      element.remove();
    }

    // Replace URLs in anchor tags
    const links = root.querySelectorAll("a");
    // for (const link of links) {
    //   const href = link.getAttribute("href");
    //   if (href) {
    //     try {
    //       let absoluteUrl = href;
    //       if (!href.startsWith("http://") && !href.startsWith("https://")) {
    //         absoluteUrl = new URL(href, targetUrl).href;
    //       }
    //       link.setAttribute("href", `${reqOrigin}/proxy?url=${encodeURIComponent(absoluteUrl)}`);
    //       link.setAttribute("target", `_parent`);
    //     } catch (e) {
    //       // Invalid URL, leave as is
    //     }
    //   }
    // }

    // Rewrite script src attributes
    for (const script of root.querySelectorAll("script")) {
      const src = script.getAttribute("src");

      // Remove script if it's used for tracking
      const isTracker = isTrackingScript(src || "");
      if (isTracker) script.remove();

      // Replace src attribute with proxy
      if (src && !src.startsWith("http") && !src.startsWith("//")) {
        script.setAttribute(
          "src",
          `${process.env.HOST}/proxy/resource?url=${targetOrigin}${encodeURIComponent(src)}`
        );
      }
    }

    // Rewrite img src attributes
    for (const img of root.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http") && !src.startsWith("//")) {
        img.setAttribute(
          "src",
          `${process.env.HOST}/proxy/resource?url=${targetOrigin}${encodeURIComponent(src)}`
        );
      }
    }

    // Rewrite link href attributes (for CSS, JS, icons, etc.)
    const linksToChangeHref = [
      ...root.querySelectorAll('link[rel="stylesheet"]'),
      ...root.querySelectorAll('link[rel="preload"]'),
      ...root.querySelectorAll('link[rel="modulepreload"]'),
      ...root.querySelectorAll('link[rel="icon"]'),
      ...root.querySelectorAll('link[rel="search"]'),
    ];
    for (const link of linksToChangeHref) {
      const href = link.getAttribute("href");

      // Favicon not needed
      if (link.getAttribute("rel") === "icon") link.setAttribute("href", "");

      // If it's same origin link
      if (href && !href.startsWith("http") && !href.startsWith("//")) {
        link.setAttribute(
          "href",
          `${process.env.HOST}/proxy/resource?url=${targetOrigin}${encodeURIComponent(href)}`
        );
      }

      // If it's 3rd party link, still proxy
      if (href?.startsWith("http")) {
        link.setAttribute(
          "href",
          `${process.env.HOST}/proxy/resource?url=${encodeURIComponent(href)}`
        );
      }
    }

    // Replace URLs in images, CSS, etc.
    // const elements = root.querySelectorAll("img, link, script");
    // for (const elem of elements) {
    //   const srcAttr = elem.tagName.toLowerCase() === "link" ? "href" : "src";
    //   const src = elem.getAttribute(srcAttr);
    //   if (src && !src.startsWith("data:")) {
    //     try {
    //       let absoluteSrc = src;
    //       if (!src.startsWith("http://") && !src.startsWith("https://")) {
    //         absoluteSrc = new URL(src, targetOrigin).href;
    //       }
    //       console.log(`${process.env.HOST}/proxy/resource?url=${absoluteSrc}`);
    //       console.log("-----------------------------------");

    //       elem.setAttribute(srcAttr, `${process.env.HOST}/proxy/resource?url=${absoluteSrc}`);
    //     } catch (e) {
    //       // Invalid URL, leave as is
    //     }
    //   }
    // }

    // Return processed HTML
    return root.toString();
  } else {
    // For non-HTML content (images, PDFs, etc.), pass through
    const otherData = await response.text();

    return otherData;
  }
};
