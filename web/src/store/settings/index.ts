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
  | "social_media"
  | "other";

export type IFaviconAPI = "duckduckgo" | "google" | "favicone";

interface SettingsState {
  hydrated: boolean;

  categories: ICategories[];
  setCategories: (next: ICategories[]) => void;

  showEngines: boolean;
  setShowEngines: (next: boolean) => void;

  selectedMedia: "images" | "videos";
  setSelectedMedia: (next: "images" | "videos") => void;
  displayMedia: boolean;
  setDisplayMedia: (next: boolean) => void;

  displayFavicon: boolean;
  setDisplayFavicon: (next: boolean) => void;
  faviconProvider: IFaviconAPI;
  setFaviconProvider: (next: IFaviconAPI) => void;

  useAutocomplete: boolean;
  setUseAutocomplete: (next: boolean) => void;
  autocompleteEngine: IAutocompleteEngines;
  setAutocompleteEngine: (next: IAutocompleteEngines) => void;

  useInstantAnswers: boolean;
  setUseInstantAnswers: (next: boolean) => void;

  useAIAnswers: boolean;
  setUseAIAnswers: (next: boolean) => void;

  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;

  privateSearch: boolean;
  setPrivateSearch: (next: boolean) => void;

  privatePlayer: boolean;
  setPrivatePlayer: (next: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hydrated: false,

      categories: ["general", "images", "videos", "news", "maps"],
      setCategories: (next) => set({ categories: next }),

      showEngines: false,
      setShowEngines: (next) => set({ showEngines: next }),

      selectedMedia: "images",
      setSelectedMedia: (next) => set({ selectedMedia: next }),
      displayMedia: true,
      setDisplayMedia: (next) => set({ displayMedia: next }),

      displayFavicon: false,
      setDisplayFavicon: (next) => set({ displayFavicon: next }),
      faviconProvider: "duckduckgo",
      setFaviconProvider: (next) => set({ faviconProvider: next }),

      useAutocomplete: true,
      setUseAutocomplete: (next) => set({ useAutocomplete: next }),
      autocompleteEngine: "google",
      setAutocompleteEngine: (next) => set({ autocompleteEngine: next }),
      useInstantAnswers: true,
      setUseInstantAnswers: (next) => set({ useInstantAnswers: next }),

      useAIAnswers: false,
      setUseAIAnswers: (next) => set({ useAIAnswers: next }),

      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),

      privateSearch: false,
      setPrivateSearch: (next) => set({ privateSearch: next }),

      privatePlayer: false,
      setPrivatePlayer: (next) => set({ privatePlayer: next }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "settings-store", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => cookieStorage), // Test for SSR
      partialize: (state) => ({
        displayFavicon: state.displayFavicon,
        faviconProvider: state.faviconProvider,
        openInNewTab: state.openInNewTab,
        useAutocomplete: state.useAutocomplete,
        autocompleteEngine: state.autocompleteEngine,
        categories: state.categories,
        privateSearch: state.privateSearch,
        privatePlayer: state.privatePlayer,
        displayMedia: state.displayMedia,
        selectedMedia: state.selectedMedia,
        useInstantAnswers: state.useInstantAnswers,
        useAIAnswers: state.useAIAnswers,
        showEngines: state.showEngines,
      }),
    }
  )
);
