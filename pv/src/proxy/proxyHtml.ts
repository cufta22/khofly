import type { Context } from "elysia";
import { parse } from "node-html-parser";
import { isTrackingScript } from "../utils/isTrackingScript";
import { getJsInjectResolve } from "../utils/jsInject";

export const handleProxyHtml = async (ctx: Context) => {
  const { searchParams, protocol, host } = new URL(ctx.request.url);
  const targetUrl = searchParams.get("url") || "";

  const { origin: targetOrigin } = new URL(targetUrl);
  const reqOrigin = ctx.request.headers?.get("origin");

  if (!targetUrl) {
    throw ctx.status(400, "URL is required");
  }

  if (!protocol || !host) {
    throw ctx.status(400, "Invalid URL");
  }

  // Base URLs
  const ASSET_BASE_URL = `${process.env.HOST}/proxy/asset`;
  const ANCHOR_BASE_URL = `${reqOrigin}/pv/proxy`;

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
    const head = root.querySelector("head");

    // root.prepend(scriptInterceptorCode);

    // Inject global import resolve code
    if (head) {
      const jsInjectResolve = getJsInjectResolve(`${ASSET_BASE_URL}?url=`);

      head?.insertAdjacentHTML("afterbegin", jsInjectResolve);
    }

    // -------------------------------------------------------------------------
    // Remove possible tracking elements
    // -------------------------------------------------------------------------
    const elementsToRemove = [
      ...root.querySelectorAll("iframe"),
      ...root.querySelectorAll('meta[http-equiv="refresh"]'),
      ...root.querySelectorAll('img[width="1"][height="1"], img[width="0"][height="0"]'),
    ];
    for (const element of elementsToRemove) {
      element.remove();
    }

    // -------------------------------------------------------------------------
    // Replace URLs in anchor tags
    // -------------------------------------------------------------------------
    const links = root.querySelectorAll("a");
    for (const link of links) {
      const href = link.getAttribute("href");
      if (href) {
        try {
          let absoluteUrl = href;
          if (!href.startsWith("http://") && !href.startsWith("https://")) {
            absoluteUrl = new URL(href, targetUrl).href;
          }
          const proxiedUrl = `${ANCHOR_BASE_URL}?url=${encodeURIComponent(absoluteUrl)}`;

          link.setAttribute("href", proxiedUrl);
          link.setAttribute("target", `_parent`);
        } catch (e) {
          // Invalid URL, leave as is
        }
      }
    }

    // -------------------------------------------------------------------------
    // Rewrite script src attributes
    // -------------------------------------------------------------------------
    for (const script of root.querySelectorAll("script")) {
      const src = script.getAttribute("src");

      // Remove script if it's used for tracking
      const isTracker = isTrackingScript(src || "");
      if (isTracker) script.remove();

      // Replace any other dinamically imported scripts
      const scriptContent = script.innerText;
      if (scriptContent) {
        // Regex to find import("*");
        const importRegex = /(import\s*\(\s*["'`])(https?:\/\/[^"')`]+)(["'`]\s*\))/gi;

        const modifiedScriptContent = scriptContent.replace(importRegex, (match, p1, p2, p3) => {
          // p1 = import("
          // p2 = original url
          // p3 = ")
          const proxiedUrl = `${ASSET_BASE_URL}?url=${p2}`;

          return `${p1}${proxiedUrl}${p3}`;
        });

        // Update the script tag's content
        script.set_content(modifiedScriptContent);
      }

      // Replace src attribute with proxy
      if (src && !src.startsWith("http") && !src.startsWith("//")) {
        const proxiedUrl = `${ASSET_BASE_URL}?url=${targetOrigin}${encodeURIComponent(src)}`;
        script.setAttribute("src", proxiedUrl);
      }
    }

    // -------------------------------------------------------------------------
    // Rewrite url in style tags
    // -------------------------------------------------------------------------
    for (const style of root.querySelectorAll("style")) {
      let cssContent = style.innerHTML;
      const urlRegex = /url\(['"]?(.*?)(['"]?\))/g;

      // Replace URLs within the style tag
      cssContent = cssContent.replace(urlRegex, (match, url) => {
        const proxiedUrl = `${ASSET_BASE_URL}?url=${url}`;

        return `url(${proxiedUrl})`; // Ensure it's wrapped in quotes for CSS
      });

      // Update the innerHTML of the style tag
      style.innerHTML = cssContent;
    }

    // -------------------------------------------------------------------------
    // Rewrite url in inline styles
    // -------------------------------------------------------------------------
    for (const element of root.querySelectorAll("[style]")) {
      let inlineStyle = element.getAttribute("style");
      const urlRegex = /url\(['"]?(.*?)(['"]?\))/g;

      if (inlineStyle) {
        inlineStyle = inlineStyle.replace(urlRegex, (match, url) => {
          const proxiedUrl = `${ASSET_BASE_URL}?url=${url}`;

          return `url('${proxiedUrl}')`;
        });
        element.setAttribute("style", inlineStyle);
      }
    }

    // -------------------------------------------------------------------------
    // Rewrite img src attributes
    // -------------------------------------------------------------------------
    for (const img of root.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http") && !src.startsWith("//")) {
        const proxiedUrl = `${ASSET_BASE_URL}?url=${targetOrigin}${encodeURIComponent(src)}`;

        img.setAttribute("src", proxiedUrl);
      }
    }

    // -------------------------------------------------------------------------
    // Rewrite link href attributes (for CSS, JS, icons, etc.)
    // -------------------------------------------------------------------------
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
      if (link.getAttribute("rel") === "icon") link.remove();

      // If it's same origin link
      if (href && !href.startsWith("http") && !href.startsWith("//")) {
        const proxiedUrl = `${ASSET_BASE_URL}?url=${targetOrigin}${encodeURIComponent(href)}`;

        link.setAttribute("href", proxiedUrl);
      }

      // If it's 3rd party link, still proxy
      if (href?.startsWith("http")) {
        const proxiedUrl = `${ASSET_BASE_URL}?url=${encodeURIComponent(href)}`;

        link.setAttribute("href", proxiedUrl);
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
