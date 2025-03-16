import type { INewsEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_NEWS: {
  type: "divider" | "engine";
  value: INewsEngines | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  bang: string;
  safeSearch: boolean;
  timeRange: boolean;
}[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_news2",
    bang: "!web",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engine_DDG_news",
    bang: "!ddn",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mojeek",
    alt: "Mojeek logo",
    icon: "/assets/engines/mojeek-icon.svg",
    label: "pages.settings.engines.engine_mojeek_news",
    bang: "!mjknews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "presearch",
    alt: "Presearch logo",
    icon: "/assets/engines/presearch-icon.svg",
    label: "pages.settings.engines.engine_presearch_news",
    bang: "!psnews",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "startpage",
    alt: "Startpage logo",
    icon: "",
    label: "pages.settings.engines.engine_startpage_news",
    bang: "!spn",
    safeSearch: true,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_news3",
    bang: "!wikimedia",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikinews",
    alt: "Wikinews logo",
    icon: "/assets/engines/wikinews-icon.svg",
    label: "pages.settings.engines.engine_wikinews",
    bang: "!wn",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_without",
    bang: "",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engine_bing_news",
    bang: "!bin",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engine_brave_news",
    bang: "!brnews",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engine_google_news",
    bang: "!gon",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engine_qwant_news",
    bang: "!qwn",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "yahoo",
    alt: "Yahoo logo",
    icon: "/assets/engines/yahoo-icon.svg",
    label: "pages.settings.engines.engine_yahoo_news",
    bang: "!yhn",
    safeSearch: false,
    timeRange: false,
  },
];
