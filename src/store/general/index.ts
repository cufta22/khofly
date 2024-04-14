import { create } from "zustand";
import { persist } from "zustand/middleware";
interface GeneralState {
  hydrated: boolean;

  geolocation: { lon: string; lat: string } | null;
  setGeolocation: (next: { lon: string; lat: string }) => void;

  devMode: boolean;
  toggleDevMode: () => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set, get) => ({
      hydrated: false,

      geolocation: null,
      setGeolocation: (next) => set({ geolocation: next }),

      devMode: false,
      toggleDevMode: () => set({ devMode: !get().devMode }),
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
