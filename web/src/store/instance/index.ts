import { cookieStorage } from '@store/cookieStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type IWeatherSource = 'owm' | 'om';

export type IWorkerModels = string;

interface InstanceState {
  hydrated: boolean;

  searXNGDomain: string;
  setSearXNGDomain: (domain: string) => void;

  apiDomain: string;
  setApiDomain: (domain: string) => void;

  pvDomain: string;
  setPvDomain: (domain: string) => void;

  nominatimDomain: string;
  setNominatimDomain: (domain: string) => void;

  workerDomain: string;
  setWorkerDomain: (domain: string) => void;
}

export const useInstanceStore = create<InstanceState>()(
  persist(
    (set) => ({
      hydrated: false,

      searXNGDomain: '', // Will be set initially in layout
      setSearXNGDomain: (domain) => set({ searXNGDomain: domain }),

      apiDomain: '', // Will be set initially in layout
      setApiDomain: (domain) => set({ apiDomain: domain }),

      pvDomain: '', // Will be set initially in layout
      setPvDomain: (domain) => set({ pvDomain: domain }),

      nominatimDomain: '', // Will be set initially in layout
      setNominatimDomain: (domain) => set({ nominatimDomain: domain }),

      workerDomain: '', // Will be set initially in layout
      setWorkerDomain: (domain) => set({ workerDomain: domain }),
    }),
    {
      name: 'instance-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      partialize: (state) => ({
        searXNGDomain: state.searXNGDomain,
        apiDomain: state.apiDomain,
        nominatimDomain: state.nominatimDomain,
        workerDomain: state.workerDomain,
      }),
    },
  ),
);
