import { IImagesEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_IMAGES: {
  type: "divider" | "engine";
  value: IImagesEngines | "";
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
    label: "pages.settings.engines.titleImg2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bing",
    alt: "Bing logo",
    icon: "/assets/engines/bing-icon.svg",
    label: "pages.settings.engines.engineBingImg",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "brave",
    alt: "Brave logo",
    icon: "/assets/engines/brave-icon.svg",
    label: "pages.settings.engines.engineBraveImg",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "duckduckgo",
    alt: "DuckDuckGo logo",
    icon: "/assets/engines/ddg-icon.svg",
    label: "pages.settings.engines.engineDDGImg",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "google",
    alt: "Google logo",
    icon: "/assets/engines/google-icon.svg",
    label: "pages.settings.engines.engineGoogleImg",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "presearch",
    alt: "Presearch logo",
    icon: "/assets/engines/presearch-icon.svg",
    label: "pages.settings.engines.enginePresearchImg",
    safeSearch: true,
    timeRange: true,
  },
  {
    type: "engine",
    value: "qwant",
    alt: "Qwant logo",
    icon: "/assets/engines/qwant-icon.svg",
    label: "pages.settings.engines.engineQwantImg",
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
    value: "deviantart",
    alt: "DeviantArt logo",
    icon: "/assets/engines/deviantart-icon.svg",
    label: "pages.settings.engines.engineDeviantArtImg",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "flickr",
    alt: "Flickr logo",
    icon: "/assets/engines/flickr-icon.svg",
    label: "pages.settings.engines.engineFlickrImg",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "pinterest",
    alt: "Pinterest logo",
    icon: "/assets/engines/pinterest-icon.svg",
    label: "pages.settings.engines.enginePinterestImg",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "unsplash",
    alt: "Unsplash logo",
    icon: "/assets/engines/unsplash-icon.svg",
    label: "pages.settings.engines.engineUnsplashImg",
    safeSearch: false,
    timeRange: false,
  },
];
