import type { MantineTheme } from "@mantine/core";
import {
  IconApiApp,
  IconBracketsAngle,
  IconBrandCloudflare,
  IconCookie,
  IconLanguage,
  IconMessageCode,
  IconPlayerPlay,
  IconSearch,
  IconServer,
  IconShield,
  IconSparkles,
  IconWorld,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

export const DOCS_CARD_DATA = (theme: MantineTheme) => ({
  syntax: {
    href: "/docs/instant-answers",
    icon: <IconBracketsAngle style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Search Syntax",
    description: "See how you can modify categories, engines, languages and more",
  },
  IA: {
    href: "/docs/instant-answers",
    icon: <IconMessageCode style={getIconStyle(28)} color={theme.colors.grape[5]} />,
    title: "Instant Answers",
    description: "Explore different Instant Answers provided by Khofly",
  },
  AI: {
    href: "/docs/ai-answers",
    icon: <IconSparkles style={getIconStyle(28)} color={theme.colors.pink[5]} />,
    title: "AI Answers",
    description: "Learn more about AI answers",
  },
  privateSearch: {
    href: "/docs/private-search",
    icon: <IconShield style={getIconStyle(28)} color={theme.colors.green[5]} />,
    title: "Private Search",
    description: "Make sure your search queries stay private",
  },
  privatePlayer: {
    href: "/docs/private-player",
    icon: <IconPlayerPlay style={getIconStyle(28)} color={theme.colors.orange[5]} />,
    title: "Private Player",
    description: "Play videos privately",
  },
  setDefault: {
    href: "/docs/set-default",
    icon: <IconWorld style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Set Default",
    description: "Set Khofly as default search engine",
  },
  customSearXNG: {
    href: "/docs/custom-searxng",
    icon: <IconSearch style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Custom SearXNG",
    description: "Change the default SearXNG instance to your own",
  },
  customKhoflyAPI: {
    href: "/docs/custom-khofly-api",
    icon: <IconApiApp style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Custom Khofly API",
    description: "Change the default API instance to your own",
  },
  i18n: {
    href: "/docs/internationalization",
    icon: <IconLanguage style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Internationalization",
    description: "Khofly aims to provide best experience to everyone",
  },
  siteData: {
    href: "/docs/site-data",
    icon: <IconCookie style={getIconStyle(28)} color={theme.colors.yellow[5]} />,
    title: "Site Data",
    description: "View all site data that Khofly stores",
  },
  selfHostSearXNG: {
    href: "/docs/self-host-searxng",
    icon: <IconSearch style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Self-Host SearXNG",
    description: "Own your data by self-hosting your SearXNG instance",
  },
  selfHostCFWorker: {
    href: "/docs/self-host-cf-workers",
    icon: <IconBrandCloudflare style={getIconStyle(28)} color={theme.colors.orange[5]} />,
    title: "CF Workers",
    description: "Setup your own Cloudflare Worker",
  },
  selfHostKhofly: {
    href: "/docs/self-host-khofly",
    icon: <IconServer style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Self-Host Khofly",
    description: "You can also host Khofly by yourself",
  },
  selfHostKhoflyAPI: {
    href: "/docs/self-host-khofly-api",
    icon: <IconServer style={getIconStyle(28)} color={theme.colors.blue[5]} />,
    title: "Self-Host Khofly API",
    description: "You can also host Khofly API by yourself",
  },
});
