import { cookieStorage } from '@store/cookieStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GeneralState {
  hydrated: boolean;

  geolocation: { lon: string; lat: string } | null;
  setGeolocation: (next: { lon: string; lat: string }) => void;

  devMode: boolean;
  setDevMode: (next: boolean) => void;

  openNavbar: boolean;
  toggleOpenNavbar: () => void;

  openHotkeyModal: boolean;
  toggleOpenHotkeyModal: () => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set, get) => ({
      hydrated: false,

      geolocation: null,
      // geolocation: { lat: "48.85661400", lon: "2.35222190" }, // Paris, for testing
      setGeolocation: (next) => set({ geolocation: next }),

      devMode: false, // Kinda unused
      setDevMode: (next) => set({ devMode: next }),

      openNavbar: false,
      toggleOpenNavbar: () => set({ openNavbar: !get().openNavbar }),

      openHotkeyModal: false,
      toggleOpenHotkeyModal: () => set({ openHotkeyModal: !get().openHotkeyModal }),
    }),
    {
      name: 'general-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      partialize: (state) => ({
        geolocation: state.geolocation,
      }),
    },
  ),
);
