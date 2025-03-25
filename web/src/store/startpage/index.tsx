import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IShortcut {
  title: string;
  href: string;
  imgUrl?: string;
}

export interface IToDo {
  id: string;
  label: string;
  checked: boolean;
}

export type IWidgetPosition = "top-left" | "top-right";

interface StartpageState {
  hydrated: boolean;

  wallpaper: string;
  setWallpaper: (next: string) => void;

  shortcuts: IShortcut[];
  setShortcuts: (next: IShortcut[]) => void;
  displayShortcuts: boolean;
  setDisplayShortcuts: (next: boolean) => void;
  openInNewTab: boolean;
  setOpenInNewTab: (next: boolean) => void;

  todos: IToDo[];
  setTodos: (next: IToDo[]) => void;
  displayTodos: boolean;
  setDisplayTodos: (next: boolean) => void;
  todosPosition: IWidgetPosition;
  setTodosPosition: (next: IWidgetPosition) => void;

  notes: string;
  setNotes: (next: string) => void;
  displayNotes: boolean;
  setDisplayNotes: (next: boolean) => void;
  notesPosition: IWidgetPosition;
  setNotesPosition: (next: IWidgetPosition) => void;

  displayWeather: boolean;
  setDislpayWeather: (next: boolean) => void;
  weatherPosition: IWidgetPosition;
  setWeatherPosition: (next: IWidgetPosition) => void;

  displayClock: boolean;
  setDislpayClock: (next: boolean) => void;
  clockPosition: IWidgetPosition;
  setClockPosition: (next: IWidgetPosition) => void;
}

export const useStatrpageStore = create<StartpageState>()(
  persist(
    (set) => ({
      hydrated: false,

      wallpaper: "",
      setWallpaper: (next) => set({ wallpaper: next }),

      shortcuts: [],
      setShortcuts: (next) => set({ shortcuts: next }),
      displayShortcuts: false,
      setDisplayShortcuts: (next) => set({ displayShortcuts: next }),
      openInNewTab: false,
      setOpenInNewTab: (next) => set({ openInNewTab: next }),

      todos: [],
      setTodos: (next) => set({ todos: next }),
      displayTodos: false,
      setDisplayTodos: (next) => set({ displayTodos: next }),
      todosPosition: "top-left",
      setTodosPosition: (next) => set({ todosPosition: next }),

      notes: "",
      setNotes: (next) => set({ notes: next }),
      displayNotes: false,
      setDisplayNotes: (next) => set({ displayNotes: next }),
      notesPosition: "top-left",
      setNotesPosition: (next) => set({ notesPosition: next }),

      displayWeather: false,
      setDislpayWeather: (next) => set({ displayWeather: next }),
      weatherPosition: "top-left",
      setWeatherPosition: (next) => set({ weatherPosition: next }),

      displayClock: false,
      setDislpayClock: (next) => set({ displayClock: next }),
      clockPosition: "top-left",
      setClockPosition: (next) => set({ clockPosition: next }),
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
        wallpaper: state.wallpaper,

        displayShortcuts: state.displayShortcuts,
        shortcuts: state.shortcuts,
        openInNewTab: state.openInNewTab,

        todos: state.todos,
        displayTodos: state.displayTodos,
        todosPosition: state.todosPosition,

        notes: state.notes,
        displayNotes: state.displayNotes,
        notesPosition: state.notesPosition,

        displayWeather: state.displayWeather,
        weatherPosition: state.weatherPosition,

        displayClock: state.displayClock,
        clockPosition: state.clockPosition,
      }),
    }
  )
);
