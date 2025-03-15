import type {
  IFilesEngines,
  IGeneralEngines,
  IITEngines,
  IImagesEngines,
  IMusicEngines,
  INewsEngines,
  IOtherEngines,
  IScienceEngines,
  ISocialMediaEngines,
  IVideosEngines,
} from "@store/engines";
import type { ICategories } from "@store/settings";

const GENERAL_BANGS: { [key in IGeneralEngines]: string } = {
  dictzone: "!dz",
  libretranslate: "!lt",
  lingva: "!lv",

  bing: "!bi",
  brave: "!br",
  duckduckgo: "!ddg",
  google: "!go",
  mojeek: "!mjk",
  presearch: "!ps",
  qwant: "!qw",
  startpage: "!sp",
  yahoo: "!yh",
  wiby: "!wiby",

  wikibooks: "!wb",
  wikiquote: "!wq",
  wikisource: "!ws",
  wikispecies: "!wsp",
  wikiversity: "!wv",
  wikivoyage: "!wy",

  alexandria: "!alx",
  ask: "!ask",
  cloudflareai: "!cfai",
  wikipedia: "!wp",
  wikidata: "!wd",
};

const IMAGES_BANGS: { [key in IImagesEngines]: string } = {
  bing: "!bii",
  brave: "!brimg",
  duckduckgo: "!ddi",
  google: "!goi",
  qwant: "!qwi",
  presearch: "!psimg",

  deviantart: "!da",
  flickr: "!fl",
  pinterest: "!pin",
  unsplash: "!us",
};

const VIDEOS_BANGS: { [key in IVideosEngines]: string } = {
  bing: "!biv",
  brave: "!brvid",
  duckduckgo: "!ddv",
  google: "!gov",
  qwant: "!qwv",

  dailymotion: "!dm",
  odysee: "!od",
  piped: "!ppd",
  vimeo: "!vm",
  youtube: "!yt",
};

const NEWS_BANGS: { [key in INewsEngines]: string } = {
  duckduckgo: "!ddn",
  presearch: "!psnews",

  wikinews: "!wn",

  bing: "!bin",
  brave: "!brnews",
  google: "!gon",
  qwant: "!qwn",
  yahoo: "!yhn",
};

const MUSIC_BANGS: { [key in IMusicEngines]: string } = {
  genius: "!gen",

  radiobrowser: "!rb",

  bandcamp: "!bc",
  mixcloud: "!mc",
  pipedmusic: "!ppdm",
  soundcloud: "!sc",
  youtube: "!yt",
};

const IT_BANGS: { [key in IITEngines]: string } = {
  dockerhub: "!dh",
  npm: "!npm",
  pypi: "!pypi",

  askubuntu: "!ubuntu",
  stackoverflow: "!st",
  superuser: "!su",

  codeberg: "!cb",
  github: "!gh",
  gitlab: "!gl",

  archwiki: "!al",
  gentoo: "!ge",

  mdn: "!mdn",
};

const SCIENCE_BANGS: { [key in IScienceEngines]: string } = {
  arxiv: "!arx",
  crossref: "!cr",
  googlescholar: "!gos",
  archive: "!ias",
  openairedatasets: "!oad",
  openairepublications: "!oap",
  pdbe: "!pdb",
  pubmed: "!pub",
  semanticscholar: "!se",
  wikispecies: "!wsp",
};

const FILES_BANGS: { [key in IFilesEngines]: string } = {
  "1337x": "!1337x",
  annas: "!aa",
  apkmirror: "!apkm",
  bt4g: "!bt4g",
  fdroid: "!fd",
  nyaa: "!nt",
  piratebay: "!tpb",
};

const SOCIAL_MEDIA_BANGS: { [key in ISocialMediaEngines]: string } = {
  "9gag": "!9g",
  lemmycomments: "!lecom",
  lemmycommunities: "!leco",
  lemmyposts: "!lepo",
  lemmyusers: "!leus",
  mastodonhashtags: "!mah",
  mastodonusers: "!mau",
  reddit: "!re",
};

const OTHER_BANGS: { [key in IOtherEngines]: string } = {
  etymonline: "",
  wiktionary: "",
  wordnik: "",
  imdb: "",
  rottentomatoes: "",
  "duckduckgo-weather": "",
  openmeteo: "",
  emojipedia: "",
  goodreads: "",
  openlibrary: "",
  podcastindex: "",
};

export const getEngineBangs = (tab: ICategories, enginesSelected: any[]) => {
  let bangs = "";

  const BANGS: { [key in ICategories]: any } = {
    general: GENERAL_BANGS,
    images: IMAGES_BANGS,
    videos: VIDEOS_BANGS,
    news: NEWS_BANGS,
    music: MUSIC_BANGS,
    it: IT_BANGS,
    science: SCIENCE_BANGS,
    files: FILES_BANGS,
    social_media: SOCIAL_MEDIA_BANGS,

    other: OTHER_BANGS,

    // unused
    maps: GENERAL_BANGS,
  };

  enginesSelected.map((eng) => {
    bangs = `${bangs}${BANGS[tab][eng]}%20`;
  });

  return bangs;
};
