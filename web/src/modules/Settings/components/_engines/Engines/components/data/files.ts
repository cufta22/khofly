import type { IDataEngine } from ".";

export const DATA_ENGINES_FILES: IDataEngine[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_files2",
    bang: "!apps",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "apkmirror",
    alt: "APKMirror logo",
    icon: "",
    label: "pages.settings.engines.engine_APKMirror_files",
    bang: "!apkm",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "appstore",
    alt: "App Store logo",
    icon: "/assets/engines/appstore-icon.svg",
    label: "pages.settings.engines.engine_app_store_files",
    bang: "!aps",
    safeSearch: true,
    timeRange: false,
  },
  {
    type: "engine",
    value: "fdroid",
    alt: "Fdroid logo",
    icon: "/assets/engines/fdroid-icon.svg",
    label: "pages.settings.engines.engine_fdriod_files",
    bang: "!fd",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "playstore",
    alt: "Play Store logo",
    icon: "/assets/engines/playstore-icon.svg",
    label: "pages.settings.engines.engine_play_store_files",
    bang: "!gpa",
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
    value: "1337x",
    alt: "1337x logo",
    icon: "/assets/engines/1337x-icon.svg",
    label: "pages.settings.engines.engine_1337x_files",
    bang: "!1337x",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "annas",
    alt: "Anna's Archive logo",
    icon: "",
    label: "pages.settings.engines.engine_annas_files",
    bang: "!aa",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bt4g",
    alt: "bt4g logo",
    icon: "",
    label: "pages.settings.engines.engine_bt4g_files",
    bang: "!bt4g",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "kickass",
    alt: "Kickass logo",
    icon: "",
    label: "pages.settings.engines.engine_kickass_files",
    bang: "!kc",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "librarygenesis",
    alt: "library Genesis logo",
    icon: "",
    label: "pages.settings.engines.engine_library_genesis_files",
    bang: "!lg",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "nyaa",
    alt: "nyaa logo",
    icon: "",
    label: "pages.settings.engines.engine_nyaa_files",
    bang: "!nt",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "piratebay",
    alt: "Pirate Bay logo",
    icon: "/assets/engines/piratebay-icon.svg",
    label: "pages.settings.engines.engine_piratebay_files",
    bang: "!tpb",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikicommons",
    alt: "Wikicommons logo",
    icon: "/assets/engines/wikicommons-icon.svg",
    label: "pages.settings.engines.engine_wikicommons_files",
    bang: "!wcf",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "zlibrary",
    alt: "Z-Library logo",
    icon: "",
    label: "pages.settings.engines.engine_zlibrary_files",
    bang: "!zlib",
    safeSearch: false,
    timeRange: false,
  },
];
