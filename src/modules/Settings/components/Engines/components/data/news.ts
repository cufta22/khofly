import { INewsEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_NEWS: {
  type: "divider" | "engine";
  value: INewsEngines | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  safeSearch: boolean;
  timeRange: boolean;
}[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleNews2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engineDDGNews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "presearch",
    alt: "Presearch logo",
    icon: "/assets/engines/presearch-icon.svg",
    label: "pages.settings.engines.enginePresearchNews",
    safeSearch: true,
    timeRange: true,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleNews3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikinews",
    alt: "Wikinews logo",
    icon: "/assets/engines/wikinews-icon.svg",
    label: "pages.settings.engines.engineWikinews",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleWithout",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engineBingNews",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engineBraveNews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engineGoogleNews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engineQwantNews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "yahoo",
    alt: "Yahoo logo",
    icon: "/assets/engines/yahoo-icon.svg",
    label: "pages.settings.engines.engineYahooNews",
    safeSearch: false,
    timeRange: false,
  },
];
