import { MantineTheme } from "@mantine/core";
import {
  IconBrandCloudflare,
  IconCookie,
  IconLanguage,
  IconMessageCode,
  IconSearch,
  IconServer,
  IconShield,
  IconWorld,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsSelfHostKhofly from "../self-host-khofly";

export const DOCS_CARD_DATA = (theme: MantineTheme) => ({
  IA: {
    href: "/docs/instant-answers",
    icon: (
      <IconMessageCode style={getIconStyle(28)} color={theme.colors.grape[5]} />
    ),
    title: "Instant Answers",
    description: "Explore different Instant Answers provided by Khofly",
  },
  privateSearch: {
    href: "/docs/private-search",
    icon: <IconShield style={getIconStyle(28)} color={theme.colors.green[5]} />,
    title: "Private Search",
    description: "Make sure your search queries stay private",
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
  i18n: {
    href: "/docs/internationalization",
    icon: (
      <IconLanguage style={getIconStyle(28)} color={theme.colors.blue[5]} />
    ),
    title: "Internationalization",
    description: "Khofly aims to provide best experience to everyone",
  },
  siteData: {
    href: "/docs/site-data",
    icon: (
      <IconCookie style={getIconStyle(28)} color={theme.colors.yellow[5]} />
    ),
    title: "Site Data",
    description: "View all site data that Khofly stores",
  },
  selfHostKhofly: {
    href: "/docs/self-host-khofly",
    icon: (
      <IconBrandCloudflare
        style={getIconStyle(28)}
        color={theme.colors.orange[5]}
      />
    ),
    title: "Self-Host Khofly",
    description: "You can also host Khofly by yourself",
  },
  selfHostSearXNG: {
    href: "/docs/self-host-searxng",
    icon: (
      <IconServer style={getIconStyle(28)} color={theme.colors.yellow[5]} />
    ),
    title: "Self-Host SearXNG",
    description: "Own your data by self-hosting your SearXNG instance",
  },
});
