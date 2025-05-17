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

  enableAutocomplete: boolean;
  setEnableAutocomplete: (next: boolean) => void;
  autocompleteEngine: IAutocompleteEngines;
  setAutocompleteEngine: (next: IAutocompleteEngines) => void;

  enableInstantAnswers: boolean;
  setEnableInstantAnswers: (next: boolean) => void;

  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;

  privateSearch: boolean;
  setPrivateSearch: (next: boolean) => void;

  privatePlayer: boolean;
  setPrivatePlayer: (next: boolean) => void;

  privateView: {
    enabled: boolean;
    openByDefault: boolean;
    allowScripts: boolean;
    allowSameOrigin: boolean;
    allowForms: boolean;
  };
  setPrivateView: (next: {
    enabled?: boolean;
    openByDefault?: boolean;
    allowScripts?: boolean;
    allowSameOrigin?: boolean;
    allowForms?: boolean;
  }) => void;

  enableAIAnswers: boolean;
  setEnableAIAnswers: (next: boolean) => void;

  enableAIChat: boolean;
  setEnableAIChat: (next: boolean) => void;

  enableAISummary: boolean;
  setEnableAISummary: (next: boolean) => void;
  aiSummaryLength: "short" | "long";
  setAISummaryLenght: (next: "short" | "long") => void;
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

      enableAutocomplete: true,
      setEnableAutocomplete: (next) => set({ enableAutocomplete: next }),
      autocompleteEngine: "google",
      setAutocompleteEngine: (next) => set({ autocompleteEngine: next }),

      enableInstantAnswers: true,
      setEnableInstantAnswers: (next) => set({ enableInstantAnswers: next }),

      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),

      privateSearch: false,
      setPrivateSearch: (next) => set({ privateSearch: next }),

      privatePlayer: false,
      setPrivatePlayer: (next) => set({ privatePlayer: next }),

      privateView: {
        enabled: false,
        openByDefault: false,
        allowScripts: false,
        allowSameOrigin: false,
        allowForms: false,
      },
      setPrivateView: (next) => set((prev) => ({ privateView: { ...prev.privateView, ...next } })),

      enableAIAnswers: false,
      setEnableAIAnswers: (next) => set({ enableAIAnswers: next }),

      enableAIChat: false,
      setEnableAIChat: (next) => set({ enableAIChat: next }),

      enableAISummary: false,
      setEnableAISummary: (next) => set({ enableAISummary: next }),
      aiSummaryLength: "short",
      setAISummaryLenght: (next) => set({ aiSummaryLength: next }),
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
        categories: state.categories,
        showEngines: state.showEngines,
        selectedMedia: state.selectedMedia,
        displayMedia: state.displayMedia,
        displayFavicon: state.displayFavicon,
        faviconProvider: state.faviconProvider,
        enableAutocomplete: state.enableAutocomplete,
        autocompleteEngine: state.autocompleteEngine,
        enableInstantAnswers: state.enableInstantAnswers,
        openInNewTab: state.openInNewTab,
        privateSearch: state.privateSearch,
        privatePlayer: state.privatePlayer,
        privateView: state.privateView,
        enableAIAnswers: state.enableAIAnswers,
        enableAIChat: state.enableAIChat,
        enableAISummary: state.enableAISummary,
        aiSummaryLength: state.aiSummaryLength,
      }),
    }
  )
);
