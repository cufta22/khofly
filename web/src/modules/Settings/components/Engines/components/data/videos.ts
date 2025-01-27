import { IVideosEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_VIDEOS: {
  type: "divider" | "engine";
  value: IVideosEngines | "";
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
    label: "pages.settings.engines.title_vid2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engine_bing_vid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engine_brave_vid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engine_DDG_vid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engine_google_vid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engine_qwant_vid",
    safeSearch: true,
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
    value: "dailymotion",
    alt: "Dailymotion logo",
    icon: "/assets/engines/dailymotion-icon.svg",
    label: "pages.settings.engines.engine_dailymotion_vid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "odysee",
    alt: "Odysee logo",
    icon: "",
    label: "pages.settings.engines.engine_odysee_vid",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "piped",
    alt: "Piped logo",
    icon: "/assets/engines/piped-icon.svg",
    label: "pages.settings.engines.engine_piped_vid",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "vimeo",
    alt: "Vimeo logo",
    icon: "",
    label: "pages.settings.engines.engine_vimeo_vid",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "youtube",
    alt: "YouTube logo",
    icon: "/assets/engines/youtube-icon.svg",
    label: "pages.settings.engines.engine_youtube_vid",
    safeSearch: false,
    timeRange: true,
  },
];
