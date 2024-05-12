import { IMusicEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_MUSIC: {
  type: "divider" | "engine";
  value: IMusicEngines | "";
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
    label: "pages.settings.engines.title_music2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "genius",
    alt: "Genius logo",
    icon: "/assets/engines/genius-icon.svg",
    label: "pages.settings.engines.engine_genius_music",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_music3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "radiobrowser",
    alt: "Radio Browser logo",
    icon: "",
    label: "pages.settings.engines.engine_RB_music",
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
    value: "bandcamp",
    alt: "Bandcamp logo",
    icon: "/assets/engines/bandcamp-icon.svg",
    label: "pages.settings.engines.engine_bandcamp_music",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mixcloud",
    alt: "Mixcloud logo",
    icon: "/assets/engines/mixcloud-icon.svg",
    label: "pages.settings.engines.engine_mixcloud_music",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pipedmusic",
    alt: "Piped logo",
    icon: "/assets/engines/piped-icon.svg",
    label: "pages.settings.engines.engine_piped_music",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "soundcloud",
    alt: "Soundcloud logo",
    icon: "/assets/engines/soundcloud-icon.svg",
    label: "pages.settings.engines.engine_SC_music",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "youtube",
    alt: "YouTube logo",
    icon: "/assets/engines/youtube-icon.svg",
    label: "pages.settings.engines.engine_YT_music",
    safeSearch: false,
    timeRange: true,
  },
];
