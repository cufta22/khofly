import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ context }: LoaderFunctionArgs) => {
  // handle "GET" request
  // set up our json content that will be returned in the response
  const siteUrl = process.env.HOST;
  const siteName = process.env.APP_NAME;

  const manifestJson = {
    name: siteName,
    short_name: siteName,
    description: `${siteName} - a modern SearXNG front-end, focused on speed and user experience.`,
    theme_color: "#228be6",
    background_color: "#3b3b3b",
    display: "standalone",
    scope: "/",
    start_url: `${siteUrl}/`,
    icons: [
      {
        src: "/icons/48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/64x64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };

  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(JSON.stringify(manifestJson), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
