import { IFilesEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_FILES: {
  type: "divider" | "engine";
  value: IFilesEngines | "";
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
    label: "pages.settings.engines.titleFiles2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "apkmirror",
    alt: "APKMirror logo",
    icon: "",
    label: "pages.settings.engines.engineAPKMirrorFiles",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "fdroid",
    alt: "Fdroid logo",
    icon: "/assets/engines/fdroid-icon.svg",
    label: "pages.settings.engines.engineFdriodFiles",
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
    value: "1337x",
    alt: "1337x logo",
    icon: "/assets/engines/1337x-icon.svg",
    label: "pages.settings.engines.engine1337xFiles",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "annas",
    alt: "Anna's Archive logo",
    icon: "",
    label: "pages.settings.engines.engineAnnasFiles",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bt4g",
    alt: "bt4g logo",
    icon: "",
    label: "pages.settings.engines.engineBt4gFiles",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "nyaa",
    alt: "nyaa logo",
    icon: "",
    label: "pages.settings.engines.engineNyaaFiles",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "piratebay",
    alt: "Pirate Bay logo",
    icon: "/assets/engines/piratebay-icon.svg",
    label: "pages.settings.engines.enginePiratebayFiles",
    safeSearch: false,
    timeRange: false,
  },
];
