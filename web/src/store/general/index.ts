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

      // geolocation: null,
      // geolocation: { lat: "44.786568", lon: "20.448921" }, // Belgrade
      // geolocation: { lat: "48.85661400", lon: "2.35222190" }, // Paris
      geolocation: { lat: "44.623219", lon: "21.187189" },
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
