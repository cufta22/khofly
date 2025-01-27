import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GeneralState {
  hydrated: boolean;

  geolocation: { lon: string; lat: string } | null;
  setGeolocation: (next: { lon: string; lat: string }) => void;

  devMode: boolean;
  setDevMode: (next: boolean) => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set, get) => ({
      hydrated: false,

      geolocation: null,
      setGeolocation: (next) => set({ geolocation: next }),

      devMode: false,
      setDevMode: (next) => set({ devMode: next }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "general-store", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        geolocation: state.geolocation,
      }),
    }
  )
);
