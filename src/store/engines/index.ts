import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ENGINES } from "./default_engines";

export type IGeneralEngines =
  | "google"
  | "mojeek"
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
  | "wikipedia"
  | "wikidata";

export type IImagesEngines =
  | "google"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "qwant"
  | "presearch"
  | "deviantart"
  | "flickr"
  | "pinterest"
  | "unsplash";

export type IVideosEngines =
  | "google"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "qwant"
  | "dailymotion"
  | "odysee"
  | "piped"
  | "vimeo"
  | "youtube";

export type INewsEngines =
  | "google"
  | "duckduckgo"
  | "bing"
  | "brave"
  | "qwant"
  | "yahoo"
  | "presearch"
  | "wikinews";

export type IMusicEngines =
  | "genius"
  | "radiobrowser"
  | "bandcamp"
  | "mixcloud"
  | "pipedmusic"
  | "soundcloud"
  | "youtube";

export type IITEngines =
  | "dockerhub"
  | "npm"
  | "pypi"
  | "askubuntu"
  | "stackoverflow"
  | "superuser"
  | "codeberg"
  | "github"
  | "gitlab"
  | "archwiki"
  | "gentoo"
  | "mdn";

export type IScienceEngines =
  | "arxiv"
  | "crossref"
  | "googlescholar"
  | "archive"
  | "pubmed"
  | "semanticscholar"
  | "wikispecies"
  | "openairedatasets"
  | "openairepublications"
  | "pdbe";

export type IFilesEngines =
  | "apkmirror"
  | "fdroid"
  | "1337x"
  | "annas"
  | "bt4g"
  | "nyaa"
  | "piratebay";

export type ISocialMediaEngines =
  | "9gag"
  | "lemmycomments"
  | "lemmycommunities"
  | "lemmyposts"
  | "lemmyusers"
  | "mastodonhashtags"
  | "mastodonusers"
  | "reddit";

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

      enginesMusic: ["radiobrowser", "soundcloud", "youtube"],
      setEnginesMusic: (next) => set({ enginesMusic: next }),

      enginesIT: DEFAULT_ENGINES.it,
      setEnginesIT: (next) => set({ enginesIT: next }),

      enginesScience: DEFAULT_ENGINES.science,
      setEnginesScience: (next) => set({ enginesScience: next }),

      enginesFiles: DEFAULT_ENGINES.files,
      setEnginesFiles: (next) => set({ enginesFiles: next }),

      enginesSocialMedia: DEFAULT_ENGINES.social_media,
      setEnginesSocialMedia: (next) => set({ enginesSocialMedia: next }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "engines-store", // name of the item in the storage (must be unique)
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
      }),
    }
  )
);
