import type { IMusicEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_MUSIC: {
  type: "divider" | "engine";
  value: IMusicEngines | "";
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
    label: "pages.settings.engines.title_music2",
    bang: "!lyrics",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "genius",
    alt: "Genius logo",
    icon: "/assets/engines/genius-icon.svg",
    label: "pages.settings.engines.engine_genius_music",
    bang: "!gen",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_music3",
    bang: "!radio",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "radiobrowser",
    alt: "Radio Browser logo",
    icon: "",
    label: "pages.settings.engines.engine_RB_music",
    bang: "!rb",
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
    value: "bandcamp",
    alt: "Bandcamp logo",
    icon: "/assets/engines/bandcamp-icon.svg",
    label: "pages.settings.engines.engine_bandcamp_music",
    bang: "!bc",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "deezer",
    alt: "Deezer logo",
    icon: "/assets/engines/deezer-icon.svg",
    label: "pages.settings.engines.engine_deezer_music",
    bang: "!dz",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mixcloud",
    alt: "Mixcloud logo",
    icon: "/assets/engines/mixcloud-icon.svg",
    label: "pages.settings.engines.engine_mixcloud_music",
    bang: "!mc",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "piped",
    alt: "Piped logo",
    icon: "/assets/engines/piped-icon.svg",
    label: "pages.settings.engines.engine_piped_music",
    bang: "!ppdm",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "soundcloud",
    alt: "Soundcloud logo",
    icon: "/assets/engines/soundcloud-icon.svg",
    label: "pages.settings.engines.engine_SC_music",
    bang: "!sc",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikicommons",
    alt: "Wikicommons logo",
    icon: "/assets/engines/wikicommons-icon.svg",
    label: "pages.settings.engines.engine_wikicommons_music",
    bang: "!wca",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "youtube",
    alt: "YouTube logo",
    icon: "/assets/engines/youtube-icon.svg",
    label: "pages.settings.engines.engine_YT_music",
    bang: "!yt",
    safeSearch: false,
    timeRange: true,
  },
];
