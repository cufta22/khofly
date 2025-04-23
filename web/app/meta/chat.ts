import type { MetaFunction } from "react-router";

const appName = process.env.IS_SELF_HOST === "1" ? process.env.APP_NAME : "Khofly";

export const CHAT_META_FUNCTION: MetaFunction = () => [
  {
    title: `${appName} | AI Chat`,
  },
  {
    name: "description",
    content: "Khofly - a modern SearXNG front-end, focused on speed and user experience.",
  },
  {
    name: "keywords",
    content: "Khofly, Search, Khofly Search, SearXNG, FOSS, open source, meta search engine",
  },
  // Open Graph stuff
  {
    property: "og:title",
    content: `${appName} | AI Chat`,
  },
  {
    property: "og:description",
    content: "Khofly - a modern SearXNG front-end, focused on speed and user experience.",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:site_name",
    content: "Khofly",
  },
  {
    property: "og:image",
    content: "https://khofly.com/images/og.png",
  },
  {
    property: "og:image:width",
    content: "1200",
  },
  {
    property: "og:image:height",
    content: "600",
  },
  {
    property: "og:image:alt",
    content: "Khofly og image",
  },
  {
    property: "og:image:type",
    content: "image/png",
  },
];
