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
  startpage: "!spi",

  deviantart: "!da",
  flickr: "!fl",
  pinterest: "!pin",
  unsplash: "!us",
  wikicommons: "!wc",
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
  rumble: "!ru",
  vimeo: "!vm",
  youtube: "!yt",
};

const NEWS_BANGS: { [key in INewsEngines]: string } = {
  duckduckgo: "!ddn",
  mojeek: "!mjknews",
  presearch: "!psnews",
  startpage: "!spn",

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
  deezer: "!dz",
  mixcloud: "!mc",
  piped: "!ppdm",
  soundcloud: "!sc",
  wikicommons: "!wca",
  youtube: "!yt",
};

const IT_BANGS: { [key in IITEngines]: string } = {
  crates: "!crates",
  dockerhub: "!dh",
  npm: "!npm",
  packagist: "!pack",
  pkggodev: "!pgo",
  pypi: "!pypi",
  rubygems: "!rbg",
  void: "!void",

  askubuntu: "!ubuntu",
  stackoverflow: "!st",
  superuser: "!su",

  bitbucket: "!bb",
  codeberg: "!cb",
  github: "!gh",
  gitlab: "!gl",

  archwiki: "!al",
  gentoo: "!ge",
  nixoswiki: "!nixw",

  hackernews: "!hn",
  mankier: "!man",
  mdn: "!mdn",
};

const SCIENCE_BANGS: { [key in IScienceEngines]: string } = {
  arxiv: "!arx",
  crossref: "!cr",
  googlescholar: "!gos",
  // archive: "", // Removed from SearXNG??
  pubmed: "!pub",
  semanticscholar: "!se",

  wikispecies: "!wsp",

  openairedatasets: "!oad",
  openairepublications: "!oap",
  pdbe: "!pdb",
};

const FILES_BANGS: { [key in IFilesEngines]: string } = {
  apkmirror: "!apkm",
  appstore: "!aps",
  fdroid: "!fd",
  playstore: "gpa!",

  "1337x": "!1337x",
  annas: "!aa",
  bt4g: "!bt4g",
  kickass: "!kc",
  librarygenesis: "!lg",
  nyaa: "!nt",
  piratebay: "!tpb",
  wikicommons: "!wcf",
  zlibrary: "!zlib",
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
  tootfinder: "!toot",
};

const OTHER_BANGS: { [key in IOtherEngines]: string } = {
  etymonline: "!et",
  wiktionary: "!wt",
  wordnik: "!def",
  imdb: "!imdb",
  rottentomatoes: "!rt",
  duckduckgo: "!ddw",
  openmeteo: "!om",
  emojipedia: "!em",
  goodreads: "!good",
  openlibrary: "!ol",
  podcastindex: "!podcast",
};

export const getEngineBangs = (
  tab: ICategories,
  enginesSelected: any[],
  enginesOther: IOtherEngines[]
) => {
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

  // For selected category
  enginesSelected.map((eng) => {
    bangs = `${bangs}${BANGS[tab][eng]}%20`;
  });

  // For other, only in general
  if (tab === "general") {
    enginesOther.map((eng) => {
      bangs = `${bangs}${BANGS[`other`][eng]}%20`;
    });
  }

  return bangs;
};
