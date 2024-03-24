import { IGeneralEngines } from "@store/search";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_GENERAL: {
  type: "divider" | "engine";
  value: IGeneralEngines | "";
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
    label: "pages.settings.engines.title2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/bing-icon.svg",
    label: "pages.settings.engines.engineBing",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/brave-icon.svg",
    label: "pages.settings.engines.engineBrave",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/ddg-icon.svg",
    label: "pages.settings.engines.engineDDG",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/google-icon.svg",
    label: "pages.settings.engines.engineGoogle",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "mojeek",
    alt: "Mojeek logo",
    icon: "/assets/mojeek-icon.svg",
    label: "pages.settings.engines.engineMojeek",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "presearch",
    alt: "Presearch logo",
    icon: "/assets/presearch-icon.svg",
    label: "pages.settings.engines.enginePresearch",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/qwant-icon.svg",
    label: "pages.settings.engines.engineQwant",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "startpage",
    alt: "Startpage logo",
    icon: "",
    label: "pages.settings.engines.engineStartpage",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "yahoo",
    alt: "Yahoo logo",
    icon: "/assets/yahoo-icon.svg",
    label: "pages.settings.engines.engineYahoo",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikibooks",
    alt: "Wikibooks logo",
    icon: "/assets/wikibooks-icon.svg",
    label: "pages.settings.engines.engineWikibooks",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikisource",
    alt: "Wikisource logo",
    icon: "/assets/wikisource-icon.svg",
    label: "pages.settings.engines.engineWikisource",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikispecies",
    alt: "Wikispecies logo",
    icon: "/assets/wikispecies-icon.svg",
    label: "pages.settings.engines.engineWikispecies",
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
    value: "alexandria",
    alt: "Alexandria logo",
    icon: "",
    label: "pages.settings.engines.engineAlexandria",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikipedia",
    alt: "Wikipedia logo",
    icon: "/assets/wikipedia-icon.svg",
    label: "pages.settings.engines.engineWikipedia",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikidata",
    alt: "Wikidata logo",
    icon: "/assets/wikidata-icon.svg",
    label: "pages.settings.engines.engineWikidata",
    safeSearch: false,
    timeRange: false,
  },
];