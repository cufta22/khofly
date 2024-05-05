import { ICategories } from "@store/settings";

export const CATEGORY_TO_STORE: {
  [key in ICategories]: {
    data:
      | "enginesGeneral"
      | "enginesImages"
      | "enginesVideos"
      | "enginesNews"
      | "enginesMusic"
      | "enginesIT"
      | "enginesScience"
      | "enginesFiles"
      | "enginesSocialMedia";
    set:
      | "setEnginesGeneral"
      | "setEnginesImages"
      | "setEnginesVideos"
      | "setEnginesNews"
      | "setEnginesMusic"
      | "setEnginesIT"
      | "setEnginesScience"
      | "setEnginesFiles"
      | "setEnginesSocialMedia";
  };
} = {
  general: {
    data: "enginesGeneral",
    set: "setEnginesGeneral",
  },
  images: {
    data: "enginesImages",
    set: "setEnginesImages",
  },
  videos: {
    data: "enginesVideos",
    set: "setEnginesVideos",
  },
  news: {
    data: "enginesNews",
    set: "setEnginesNews",
  },
  music: {
    data: "enginesMusic",
    set: "setEnginesMusic",
  },
  it: {
    data: "enginesIT",
    set: "setEnginesIT",
  },
  science: {
    data: "enginesScience",
    set: "setEnginesScience",
  },
  files: {
    data: "enginesFiles",
    set: "setEnginesFiles",
  },
  social_media: {
    data: "enginesSocialMedia",
    set: "setEnginesSocialMedia",
  },

  // Will never be used, so general is fine
  maps: {
    data: "enginesGeneral",
    set: "setEnginesGeneral",
  },
};
