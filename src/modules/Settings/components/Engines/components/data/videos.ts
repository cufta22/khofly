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
    label: "pages.settings.engines.titleVid2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engineBingVid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engineBraveVid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engineDDGVid",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engineGoogleVid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engineQwantVid",
    safeSearch: true,
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
    value: "dailymotion",
    alt: "Dailymotion logo",
    icon: "/assets/engines/dailymotion-icon.svg",
    label: "pages.settings.engines.engineDailymotionVid",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "odysee",
    alt: "Odysee logo",
    icon: "/assets/engines/odysee-icon.svg",
    label: "pages.settings.engines.engineOdyseeVid",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "piped",
    alt: "Piped logo",
    icon: "/assets/engines/piped-icon.svg",
    label: "pages.settings.engines.enginePipedVid",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "vimeo",
    alt: "Vimeo logo",
    icon: "/assets/engines/vimeo-icon.svg",
    label: "pages.settings.engines.engineVimeoVid",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "youtube",
    alt: "YouTube logo",
    icon: "/assets/engines/youtube-icon.svg",
    label: "pages.settings.engines.engineYoutubeVid",
    safeSearch: false,
    timeRange: true,
  },
];
