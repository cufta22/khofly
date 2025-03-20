import type {
  IFilesEngines,
  IGeneralEngines,
  IITEngines,
  IImagesEngines,
  IMusicEngines,
  INewsEngines,
  IScienceEngines,
  ISocialMediaEngines,
  IVideosEngines,
  IOtherEngines,
} from ".";

// Default engines picked based on results and availability
export const DEFAULT_ENGINES = {
  general: ["duckduckgo", "brave", "wikipedia"] as IGeneralEngines[],
  images: ["duckduckgo", "bing", "qwant"] as IImagesEngines[],
  videos: ["duckduckgo", "brave", "qwant"] as IVideosEngines[],
  news: ["duckduckgo", "bing", "wikinews"] as INewsEngines[],
  music: ["radiobrowser", "soundcloud", "youtube"] as IMusicEngines[],
  it: ["dockerhub", "stackoverflow", "github", "archwiki"] as IITEngines[],
  science: ["arxiv", "googlescholar", "semanticscholar", "pdbe"] as IScienceEngines[],
  files: ["fdroid", "bt4g", "piratebay"] as IFilesEngines[],
  social_media: [
    "lemmycomments",
    "lemmycommunities",
    "lemmyposts",
    "lemmyusers",
    "mastodonhashtags",
    "mastodonusers",
    "reddit",
  ] as ISocialMediaEngines[],
  maps: [] as string[],
  other: [] as IOtherEngines[],
};
