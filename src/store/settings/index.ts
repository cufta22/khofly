import { create } from "zustand";
import { persist } from "zustand/middleware";

export type IAutocompleteEngines = "google" | "duckduckgo" | "brave" | "qwant";

export type ICategories =
  | "general"
  | "images"
  | "videos"
  | "news"
  | "maps"
  | "music"
  | "it"
  | "science"
  | "files"
  | "social_media";

interface SettingsState {
  categories: ICategories[];
  setCategories: (next: ICategories[]) => void;

  autocompleteEngine: IAutocompleteEngines;
  setAutocompleteEngine: (next: IAutocompleteEngines) => void;

  displayFavicon: boolean;
  setDisplayFavicon: (next: boolean) => void;

  useAutocomplete: boolean;
  setUseAutocomplete: (next: boolean) => void;

  useInstantAnswers: boolean;
  setUseInstantAnswers: (next: boolean) => void;

  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;

  privateSearch: boolean;
  setPrivateSearch: (next: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      categories: ["general", "images", "videos", "news", "maps"],
      setCategories: (next) => set({ categories: next }),

      autocompleteEngine: "google",
      setAutocompleteEngine: (next) => set({ autocompleteEngine: next }),

      displayFavicon: false,
      setDisplayFavicon: (displayFavicon) => set({ displayFavicon }),

      useAutocomplete: true,
      setUseAutocomplete: (next) => set({ useAutocomplete: next }),

      useInstantAnswers: true,
      setUseInstantAnswers: (next) => set({ useInstantAnswers: next }),

      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),

      privateSearch: false,
      setPrivateSearch: (next) => set({ privateSearch: next }),
    }),
    {
      name: "settings-store", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        displayFavicon: state.displayFavicon,
        openInNewTab: state.openInNewTab,
        useAutocomplete: state.useAutocomplete,
        autocompleteEngine: state.autocompleteEngine,
        categories: state.categories,
        privateSearch: state.privateSearch,
      }),
    }
  )
);
