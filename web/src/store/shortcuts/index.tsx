import { IFaviconAPI } from "@store/settings";
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

export interface IShortcut {
  title: string;
  href: string;
  imgUrl?: string;
}

interface ShortcutsState {
  hydrated: boolean;

  shortcuts: IShortcut[];
  setShortcuts: (next: IShortcut[]) => void;

  displayShortcuts: boolean;
  setDisplayShortcuts: (next: boolean) => void;

  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;
}

export const useShortcutsStore = create<ShortcutsState>()(
  persist(
    (set) => ({
      hydrated: false,

      shortcuts: [],
      setShortcuts: (next) => set({ shortcuts: next }),

      displayShortcuts: false,
      setDisplayShortcuts: (next) => set({ displayShortcuts: next }),

      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "shortcuts-store", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => cookieStorage), // Test for SSR
      partialize: (state) => ({
        displayShortcuts: state.displayShortcuts,
        shortcuts: state.shortcuts,
        openInNewTab: state.openInNewTab,
      }),
    }
  )
);
