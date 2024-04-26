import { JSDOM } from "jsdom";

import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { platformJson } from "app/platform/json";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { searchParams } = new URL(request.url);

    const url = searchParams.get("url") || "";
    const fullUrl = url.includes("https") ? url : `https://${url}`;

    // Fetch the website HTML
    const response = await fetch("https://mantine.dev");
    const html = await response.text();

    const dom = new JSDOM(html);

    const favicons = [];
    const links = dom.window.document.querySelectorAll("link");

    for (const link of links) {
      // Parse: <link rel="shortcut icon" href="/favicon.svg">
      if (["icon", "shortcut icon"].includes(link?.rel?.toLowerCase())) {
        if (link.href) favicons.push(link.href);
      }
    }

    return platformJson({
      test: favicons,
    });
  } catch (error) {
    console.log(error);

    return platformJson({
      err: 123,
    });
  }
};
