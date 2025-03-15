import type { IFilesEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

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
    label: "pages.settings.engines.title_files2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "apkmirror",
    alt: "APKMirror logo",
    icon: "",
    label: "pages.settings.engines.engine_APKMirror_files",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "fdroid",
    alt: "Fdroid logo",
    icon: "/assets/engines/fdroid-icon.svg",
    label: "pages.settings.engines.engine_fdriod_files",
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
    value: "1337x",
    alt: "1337x logo",
    icon: "/assets/engines/1337x-icon.svg",
    label: "pages.settings.engines.engine_1337x_files",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "annas",
    alt: "Anna's Archive logo",
    icon: "",
    label: "pages.settings.engines.engine_annas_files",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bt4g",
    alt: "bt4g logo",
    icon: "",
    label: "pages.settings.engines.engine_bt4g_files",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "nyaa",
    alt: "nyaa logo",
    icon: "",
    label: "pages.settings.engines.engine_nyaa_files",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "piratebay",
    alt: "Pirate Bay logo",
    icon: "/assets/engines/piratebay-icon.svg",
    label: "pages.settings.engines.engine_piratebay_files",
    safeSearch: false,
    timeRange: false,
  },
];
