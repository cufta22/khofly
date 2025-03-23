import { create } from "zustand";
import { persist } from "zustand/middleware";

export type IWeatherSource = "owm" | "om";

export type IWorkerModels = string;

interface InstanceState {
  hydrated: boolean;

  searXNGDomain: string;
  setSearXNGDomain: (domain: string) => void;

  apiDomain: string;
  setApiDomain: (domain: string) => void;
  weatherSource: IWeatherSource;
  setWeatherSource: (source: IWeatherSource) => void;

  nominatimDomain: string;
  setNominatimDomain: (domain: string) => void;

  // AI Stuff
  workerDomain: string;
  setWorkerDomain: (domain: string) => void;
  workerModel: IWorkerModels;
  setWorkerModel: (model: IWorkerModels) => void;
}

export const useInstanceStore = create<InstanceState>()(
  persist(
    (set) => ({
      hydrated: false,

      searXNGDomain: "", // Will be set initially in layout
      setSearXNGDomain: (domain) => set({ searXNGDomain: domain }),

      apiDomain: "", // Will be set initially in layout
      setApiDomain: (domain) => set({ apiDomain: domain }),
      weatherSource: "owm",
      setWeatherSource: (source) => set({ weatherSource: source }),

      nominatimDomain: "", // Will be set initially in layout
      setNominatimDomain: (domain) => set({ nominatimDomain: domain }),

      workerDomain: "", // Will be set initially in layout
      setWorkerDomain: (domain) => set({ workerDomain: domain }),
      workerModel: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      setWorkerModel: (domain) => set({ workerModel: domain }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "instance-store", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        searXNGDomain: state.searXNGDomain,
        apiDomain: state.apiDomain,
        nominatimDomain: state.nominatimDomain,
        workerDomain: state.workerDomain,
        workerModel: state.workerModel,
      }),
    }
  )
);
