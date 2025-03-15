import type { IOtherEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_OTHER: {
  type: "divider" | "engine";
  value: IOtherEngines | "";
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
    label: "pages.settings.engines.title_other2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "etymonline",
    alt: "Etymonline logo",
    icon: "",
    label: "pages.settings.engines.engine_etymonline",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wiktionary",
    alt: "Wiktionary logo",
    icon: "",
    label: "pages.settings.engines.engine_wiktionary",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wordnik",
    alt: "Wordnik logo",
    icon: "",
    label: "pages.settings.engines.engine_wordnik",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_other3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "imdb",
    alt: "IMDb logo",
    icon: "",
    label: "pages.settings.engines.engine_imdb",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "rottentomatoes",
    alt: "Rotten Tomatoes logo",
    icon: "",
    label: "pages.settings.engines.engine_rottentomatoes",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_other4",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo-weather",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engine_DDG_weather",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "openmeteo",
    alt: "Open Meteo logo",
    icon: "",
    label: "pages.settings.engines.engine_openmeteo",
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
    value: "emojipedia",
    alt: "Emojipedia logo",
    icon: "",
    label: "pages.settings.engines.engine_emojipedia",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "goodreads",
    alt: "Goodreads logo",
    icon: "",
    label: "pages.settings.engines.engine_goodreads",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "openlibrary",
    alt: "Open Library logo",
    icon: "",
    label: "pages.settings.engines.engine_openlibrary",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "podcastindex",
    alt: "The Podcast Index logo",
    icon: "",
    label: "pages.settings.engines.engine_podcastindex",
    safeSearch: false,
    timeRange: false,
  },
];
