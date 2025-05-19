import { parse } from "node-html-parser";
import { isTrackingScript } from "./isTrackingScript";

interface Args {
  htmlData: string;
  targetUrl: string;
  reqOrigin: string | null;
  targetOrigin: string;
}

export const handleProcessHTML = ({ htmlData, targetUrl, reqOrigin, targetOrigin }: Args) => {
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
  for (const link of links) {
    const href = link.getAttribute("href");
    if (href) {
      try {
        let absoluteUrl = href;
        if (!href.startsWith("http://") && !href.startsWith("https://")) {
          absoluteUrl = new URL(href, targetUrl).href;
        }
        link.setAttribute("href", `${reqOrigin}/proxy?url=${encodeURIComponent(absoluteUrl)}`);
        link.setAttribute("target", `_parent`);
      } catch (e) {
        // Invalid URL, leave as is
      }
    }
  }

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
};
