import { IAIProvider } from "@store/aichat";
import { cookieStorage } from "@store/cookieStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export type IWeatherSource = "owm" | "om";

interface SettingsState {
  hydrated: boolean;

  categories: ICategories[];
  setCategories: (next: ICategories[]) => void;

  favicon: {
    enabled: boolean;
    provider: IFaviconAPI;
  };
  setFavicon: (next: { enabled?: boolean; provider?: IFaviconAPI }) => void;

  autocomplete: {
    enabled: boolean;
    engine: IAutocompleteEngines;
  };
  setAutocomplete: (next: { enabled?: boolean; engine?: IAutocompleteEngines }) => void;

  showEngines: boolean;
  setShowEngines: (next: boolean) => void;

  generalMedia: {
    enabled: boolean;
    type: "images" | "videos";
  };
  setGeneralMedia: (next: { enabled?: boolean; type?: "images" | "videos" }) => void;

  instantAnswers: {
    enabled: boolean;
    weatherDataSource: IWeatherSource;
  };
  setInstantAnswers: (next: { enabled?: boolean; weatherDataSource: IWeatherSource }) => void;

  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;

  privateSearch: boolean;
  setPrivateSearch: (next: boolean) => void;

  privatePlayer: {
    enabled: boolean;
    musicData: {
      url: string;
      img_src: string;
      thumbnail: string;
      title: string;
    } | null;
    videoData: {
      url: string;
    } | null;
  };
  setPrivatePlayer: (next: {
    enabled?: boolean;
    musicData?: {
      url: string;
      img_src: string;
      thumbnail: string;
      title: string;
    } | null;
    videoData?: {
      url: string;
    } | null;
  }) => void;

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

  AIAnswer: {
    enabled: boolean;
    provider: IAIProvider;
    model: {
      label: string;
      value: string;
    };
  };
  setAIAnswer: (next: {
    enabled?: boolean;
    provider?: IAIProvider;
    model?: {
      label: string;
      value: string;
    };
  }) => void;

  AIChat: {
    enabled: boolean;
  };
  setAIChat: (next: { enabled?: boolean }) => void;

  AISummary: {
    enabled: boolean;
    length: "short" | "long";
  };
  setAISummary: (next: { enabled?: boolean; length?: "short" | "long" }) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hydrated: false,

      categories: ["general", "images", "videos", "news", "maps"],
      setCategories: (next) => set({ categories: next }),

      favicon: {
        enabled: false,
        provider: "duckduckgo",
      },
      setFavicon: (next) => set((prev) => ({ favicon: { ...prev.favicon, ...next } })),

      autocomplete: {
        enabled: true,
        engine: "google",
      },
      setAutocomplete: (next) =>
        set((prev) => ({ autocomplete: { ...prev.autocomplete, ...next } })),

      showEngines: false,
      setShowEngines: (next) => set({ showEngines: next }),

      generalMedia: {
        enabled: true,
        type: "images",
      },
      setGeneralMedia: (next) =>
        set((prev) => ({ generalMedia: { ...prev.generalMedia, ...next } })),

      instantAnswers: {
        enabled: true,
        weatherDataSource: "owm",
      },
      setInstantAnswers: (next) =>
        set((prev) => ({ instantAnswers: { ...prev.instantAnswers, ...next } })),

      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),

      privateSearch: false,
      setPrivateSearch: (next) => set({ privateSearch: next }),

      privatePlayer: {
        enabled: false,
        musicData: null,
        videoData: null,
      },
      setPrivatePlayer: (next) =>
        set((prev) => ({ privatePlayer: { ...prev.privatePlayer, ...next } })),

      privateView: {
        enabled: false,
        openByDefault: false,
        allowScripts: false,
        allowSameOrigin: false,
        allowForms: false,
      },
      setPrivateView: (next) => set((prev) => ({ privateView: { ...prev.privateView, ...next } })),

      AIAnswer: {
        enabled: false,
        provider: "cf",
        model: {
          label: "Llama 3.2 3b - instruct",
          value: "@cf/meta/llama-3.2-3b-instruct",
        },
      },
      setAIAnswer: (next) => set((prev) => ({ AIAnswer: { ...prev.AIAnswer, ...next } })),

      AIChat: {
        enabled: false,
      },
      setAIChat: (next) => set((prev) => ({ AIChat: { ...prev.AIChat, ...next } })),

      AISummary: {
        enabled: false,
        length: "short",
      },
      setAISummary: (next) => set((prev) => ({ AISummary: { ...prev.AISummary, ...next } })),
    }),
    {
      name: "settings-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      partialize: (state) => ({
        categories: state.categories,
        showEngines: state.showEngines,
        generalMedia: state.generalMedia,
        favicon: state.favicon,
        autocomplete: state.autocomplete,
        instantAnswers: state.instantAnswers,
        openInNewTab: state.openInNewTab,
        privateSearch: state.privateSearch,
        privatePlayer: state.privatePlayer,
        privateView: state.privateView,
        AIAnswer: state.AIAnswer,
        AIChat: state.AIChat,
        AISummary: state.AISummary,
      }),
    },
  ),
);
