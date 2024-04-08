import {
  IGeneralEngines,
  IITEngines,
  IImagesEngines,
  IMusicEngines,
  INewsEngines,
  IVideosEngines,
} from "@store/engines";
import { ICategories } from "@store/settings";

const GENERAL_BANGS: { [key in IGeneralEngines]: string } = {
  bing: "!bi",
  brave: "!br",
  duckduckgo: "!ddg",
  google: "!go",
  mojeek: "!mjk",
  presearch: "!ps",
  qwant: "!qw",
  startpage: "!sp",
  yahoo: "!yh",

  wikibooks: "!wb",
  wikisource: "!ws",
  wikispecies: "!wsp",

  alexandria: "!alx",
  wikipedia: "!wp",
  wikidata: "!wd",
};

const IMAGES_BANGS: { [key in IImagesEngines]: string } = {
  bing: "!bii",
  brave: "!brimg",
  duckduckgo: "!ddi",
  google: "!goi",
  qwant: "!qwi",
};

const VIDEOS_BANGS: { [key in IVideosEngines]: string } = {
  bing: "!biv",
  brave: "!brvid",
  duckduckgo: "!ddv",
  google: "!gov",
  qwant: "!qwv",
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

export const getEngineBangs = (tab: ICategories, enginesSelected: any[]) => {
  let bangs = "";

  if (tab === "general") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${GENERAL_BANGS[eng]}%20`;
    });
  }

  if (tab === "images") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${IMAGES_BANGS[eng]}%20`;
    });
  }

  if (tab === "videos") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${VIDEOS_BANGS[eng]}%20`;
    });
  }

  if (tab === "news") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${NEWS_BANGS[eng]}%20`;
    });
  }

  if (tab === "music") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${MUSIC_BANGS[eng]}%20`;
    });
  }

  if (tab === "it") {
    enginesSelected.map((eng) => {
      // @ts-ignore
      bangs = bangs + `${IT_BANGS[eng]}%20`;
    });
  }

  return bangs;
};
