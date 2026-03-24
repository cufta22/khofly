import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_ENGINES } from "./default_engines";
import { cookieStorage } from "@store/cookieStorage";

export type IGeneralEngines =
  | "dictzone"
  | "libretranslate"
  | "lingva"
  | "google"
  | "mojeek"
  | "mullvadletagoogle"
  | "mullvadletabrave"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "presearch"
  | "qwant"
  | "startpage"
  | "yahoo"
  | "wiby"
  | "wikibooks"
  | "wikiquote"
  | "wikisource"
  | "wikispecies"
  | "wikiversity"
  | "wikivoyage"
  | "alexandria"
  | "ask"
  | "cloudflareai"
  | "mwmbl"
  | "rightdao"
  | "searchmysite"
  | "stract"
  | "wikidata"
  | "wikipedia"
  | "yep";

export type IImagesEngines =
  | "material"
  | "svgrepo"
  | "google"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "qwant"
  | "startpage"
  | "presearch"
  | "1x"
  | "adobestock"
  | "deviantart"
  | "flickr"
  | "imgur"
  | "pinterest"
  | "unsplash"
  | "wallhaven"
  | "wikicommons"
  | "yep";

export type IVideosEngines =
  | "google"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "qwant"
  | "adobestock"
  | "bilibili"
  | "dailymotion"
  | "invidious"
  | "odysee"
  | "peertube"
  | "piped"
  | "rumble"
  | "sepiasearch"
  | "vimeo"
  | "youtube";

export type INewsEngines =
  | "duckduckgo"
  | "mojeek"
  | "presearch"
  | "startpage"
  | "wikinews"
  | "bing"
  | "brave"
  | "google"
  | "qwant"
  | "reuters"
  | "yahoo"
  | "yep";

export type IMusicEngines =
  | "genius"
  | "radiobrowser"
  | "adobestock"
  | "bandcamp"
  | "deezer"
  | "invidious"
  | "mixcloud"
  | "piped"
  | "soundcloud"
  | "wikicommons"
  | "youtube";

export type IITEngines =
  | "crates"
  | "dockerhub"
  | "npm"
  | "packagist"
  | "pkggodev"
  | "pypi"
  | "rubygems"
  | "void"
  | "askubuntu"
  | "stackoverflow"
  | "superuser"
  | "bitbucket"
  | "codeberg"
  | "github"
  | "gitlab"
  | "archwiki"
  | "gentoo"
  | "nixoswiki"
  | "hackernews"
  | "mankier"
  | "mdn";

export type IScienceEngines =
  | "arxiv"
  | "crossref"
  | "googlescholar"
  // | "archive" // Removed???
  | "pubmed"
  | "semanticscholar"
  | "wikispecies"
  | "openairedatasets"
  | "openairepublications"
  | "pdbe";

export type IFilesEngines =
  | "apkmirror"
  | "appstore"
  | "fdroid"
  | "playstore"
  | "1337x"
  | "annas"
  | "bt4g"
  | "kickass"
  | "librarygenesis"
  | "nyaa"
  | "piratebay"
  | "wikicommons"
  | "zlibrary";

export type ISocialMediaEngines =
  | "9gag"
  | "lemmycomments"
  | "lemmycommunities"
  | "lemmyposts"
  | "lemmyusers"
  | "mastodonhashtags"
  | "mastodonusers"
  | "reddit"
  | "tootfinder";

export type IOtherEngines =
  | "etymonline"
  | "wiktionary"
  | "wordnik"
  | "imdb"
  | "rottentomatoes"
  | "minecraftwiki"
  | "duckduckgo"
  | "openmeteo"
  | "emojipedia"
  | "goodreads"
  | "openlibrary"
  | "podcastindex"
  | "steam";

export interface EnginesState {
  hydrated: boolean;

  enginesGeneral: IGeneralEngines[];
  setEnginesGeneral: (next: IGeneralEngines[]) => void;

  enginesImages: IImagesEngines[];
  setEnginesImages: (next: IImagesEngines[]) => void;

  enginesVideos: IVideosEngines[];
  setEnginesVideos: (next: IVideosEngines[]) => void;

  enginesNews: INewsEngines[];
  setEnginesNews: (next: INewsEngines[]) => void;

  enginesMusic: IMusicEngines[];
  setEnginesMusic: (next: IMusicEngines[]) => void;

  enginesIT: IITEngines[];
  setEnginesIT: (next: IITEngines[]) => void;

  enginesScience: IScienceEngines[];
  setEnginesScience: (next: IScienceEngines[]) => void;

  enginesFiles: IFilesEngines[];
  setEnginesFiles: (next: IFilesEngines[]) => void;

  enginesSocialMedia: ISocialMediaEngines[];
  setEnginesSocialMedia: (next: ISocialMediaEngines[]) => void;

  enginesOther: IOtherEngines[];
  setEnginesOther: (next: IOtherEngines[]) => void;
}

export const useEnginesStore = create<EnginesState>()(
  persist(
    (set) => ({
      hydrated: false,

      enginesGeneral: DEFAULT_ENGINES.general,
      setEnginesGeneral: (next) => set({ enginesGeneral: next }),

      enginesImages: DEFAULT_ENGINES.images,
      setEnginesImages: (next) => set({ enginesImages: next }),

      enginesVideos: DEFAULT_ENGINES.videos,
      setEnginesVideos: (next) => set({ enginesVideos: next }),

      enginesNews: DEFAULT_ENGINES.news,
      setEnginesNews: (next) => set({ enginesNews: next }),

      enginesMusic: DEFAULT_ENGINES.music,
      setEnginesMusic: (next) => set({ enginesMusic: next }),

      enginesIT: DEFAULT_ENGINES.it,
      setEnginesIT: (next) => set({ enginesIT: next }),

      enginesScience: DEFAULT_ENGINES.science,
      setEnginesScience: (next) => set({ enginesScience: next }),

      enginesFiles: DEFAULT_ENGINES.files,
      setEnginesFiles: (next) => set({ enginesFiles: next }),

      enginesSocialMedia: DEFAULT_ENGINES.social_media,
      setEnginesSocialMedia: (next) => set({ enginesSocialMedia: next }),

      enginesOther: DEFAULT_ENGINES.other,
      setEnginesOther: (next) => set({ enginesOther: next }),
    }),
    {
      name: "engines-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      partialize: (state) => ({
        enginesGeneral: state.enginesGeneral,
        enginesImages: state.enginesImages,
        enginesVideos: state.enginesVideos,
        enginesNews: state.enginesNews,
        enginesMusic: state.enginesMusic,
        enginesIT: state.enginesIT,
        enginesScience: state.enginesScience,
        enginesFiles: state.enginesFiles,
        enginesSocialMedia: state.enginesSocialMedia,
        enginesOther: state.enginesOther,
      }),
    },
  ),
);
