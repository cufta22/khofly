import { create } from "zustand";
import { persist } from "zustand/middleware";
interface GeneralState {
  hydrated: boolean;

  geolocation: { lon: string; lat: string } | null;
  setGeolocation: (next: { lon: string; lat: string }) => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      hydrated: false,

      geolocation: null,
      setGeolocation: (next) => set({ geolocation: next }),
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
