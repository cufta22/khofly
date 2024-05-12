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
    label: "pages.settings.engines.title_news2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engine_DDG_news",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "presearch",
    alt: "Presearch logo",
    icon: "/assets/engines/presearch-icon.svg",
    label: "pages.settings.engines.engine_presearch_news",
    safeSearch: true,
    timeRange: true,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_news3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikinews",
    alt: "Wikinews logo",
    icon: "/assets/engines/wikinews-icon.svg",
    label: "pages.settings.engines.engine_wikinews",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_without",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engine_bing_news",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engine_brave_news",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engine_google_news",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engine_qwant_news",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "yahoo",
    alt: "Yahoo logo",
    icon: "/assets/engines/yahoo-icon.svg",
    label: "pages.settings.engines.engine_yahoo_news",
    safeSearch: false,
    timeRange: false,
  },
];
