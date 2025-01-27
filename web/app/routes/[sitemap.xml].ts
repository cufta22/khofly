import { NAVBAR_DATA } from "@utils/resources/navbarData";
import { LoaderFunctionArgs } from "react-router";

const docsLinks = NAVBAR_DATA.flatMap((group) => group.links);

export const loader = async ({ context }: LoaderFunctionArgs) => {
  // handle "GET" request
  // set up our text content that will be returned in the response
  const loc = process.env.HOST;
  const lastMod = new Date();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
    <!-- HOME PAGE -->
    <url>
        <loc>${loc}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.00</priority>
    </url>

    <!-- STATIC PAGES -->
    <url>
        <loc>${loc}/settings</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${loc}/changelog</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.75</priority>
    </url>
    <url>
        <loc>${loc}/privacy</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- DOCS PAGES -->
    ${docsLinks.map(
      (link) => `
    <url>
        <loc>${loc}${link?.link}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    `
    )}
</urlset>
`;

  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
