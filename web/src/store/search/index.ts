import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ISearchLang = "all" | "auto" | string;

export type ISafeSearch = 0 | 1 | 2;

export type IDateRange = "all" | "day" | "month" | "year";

interface SearchState {
  hydrated: boolean;

  // Search options
  isSearchOptionsOpen: boolean;
  setIsSearchOptionsOpen: (next: boolean) => void;
  searchLanguage: ISearchLang;
  setSearchLanguage: (next: ISearchLang) => void;
  safeSearch: ISafeSearch;
  setSafeSearch: (next: ISafeSearch) => void;
  dateRange: IDateRange;
  setDateRange: (next: IDateRange) => void;

  // For Private Search
  searchQuery: string;
  setSearchQuery: (next: string) => void;

  visitedLinks: string[];
  updateVisitedLinks: (next: string) => void;
  resetVisitedLinks: () => void;

  // Organize search results
  domainsBlacklist: string[];
  setDomainsBlacklist: (next: string[]) => void;
  domainsPriority: string[];
  setDomainsPriority: (next: string[]) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      hydrated: false,

      // Search options
      isSearchOptionsOpen: false,
      setIsSearchOptionsOpen: (next) => set({ isSearchOptionsOpen: next }),
      searchLanguage: "all",
      setSearchLanguage: (next) => set({ searchLanguage: next }),
      safeSearch: 0,
      setSafeSearch: (next) => set({ safeSearch: next }),
      dateRange: "all",
      setDateRange: (next) => set({ dateRange: next }),

      // For Private Search
      searchQuery: "",
      setSearchQuery: (next) => set({ searchQuery: next }),

      visitedLinks: [],
      updateVisitedLinks: (next) =>
        set((state) => ({ visitedLinks: [...state.visitedLinks, next] })),
      resetVisitedLinks: () => set({ visitedLinks: [] }),

      // Organize search results
      domainsBlacklist: [],
      setDomainsBlacklist: (next) => set({ domainsBlacklist: next }),
      domainsPriority: [],
      setDomainsPriority: (next) => set({ domainsPriority: next }),
    }),
    {
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
      name: "search-store", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => cookieStorage), // Test for SSR
      partialize: (state) => ({
        domainsPriority: state.domainsPriority,
        domainsBlacklist: state.domainsBlacklist,
      }),
    }
  )
);
