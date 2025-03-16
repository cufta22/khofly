import { LinksGroupProps } from "@components/Navbar/Docs/components/LinksGroup";
import {
  IconApi,
  IconBox,
  IconPackage,
  IconPick,
  IconSearch,
  IconServer,
} from "@tabler/icons-react";

export const NAVBAR_DATA: LinksGroupProps[] = [
  {
    label: "Search",
    icon: IconSearch,
    links: [
      {
        label: "Search Syntax",
        link: "/docs/search-syntax",
        isWip: false,
      },
      {
        label: "Instant Answers",
        link: "/docs/instant-answers",
        isWip: false,
      },
      { label: "AI Answers", link: "/docs/ai-answers", isWip: false },
      {
        label: "Private Search",
        link: "/docs/private-search",
        isWip: false,
      },
      {
        label: "Private Player",
        link: "/docs/private-player",
        isWip: false,
      },
    ],
  },
  {
    label: "Resources",
    icon: IconBox,
    links: [
      { label: "Set Default", link: "/docs/set-default", isWip: false },
      { label: "Custom SearXNG", link: "/docs/custom-searxng", isWip: false },
      {
        label: "Languages",
        link: "/docs/internationalization",
        isWip: false,
      },
      {
        label: "Site Data",
        link: "/docs/site-data",
        isWip: false,
      },
    ],
  },
  {
    label: "Self-Host",
    icon: IconServer,
    links: [
      { label: "SearXNG", link: "/docs/self-host-searxng", isWip: false },
      { label: "AI Worker", link: "/docs/self-host-ai-worker", isWip: false },
      { label: "Khofly", link: "/docs/self-host-khofly", isWip: false },
      {
        label: "Khofly API",
        link: "/docs/self-host-khofly-api",
        isWip: false,
      },
    ],
  },
  {
    label: "3rd-Party",
    icon: IconApi,
    links: [
      { label: "Weather", link: "/docs/3rd-party-weather", isWip: false },
      {
        label: "Currency",
        link: "/docs/3rd-party-currency",
        isWip: false,
      },
      // Nominatim stuff
      // {
      //   label: "Geolocation",
      //   link: "/docs/3rd-party-geolocation",
      //   isWip: false,
      // },
    ],
  },
];
