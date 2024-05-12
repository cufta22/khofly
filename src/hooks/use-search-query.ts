import { useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";

const useSearchQuery = () => {
  const { searchQuery } = useSearchStore((state) => ({
    safeSearch: state.safeSearch,
    dateRange: state.dateRange,
    searchLanguage: state.searchLanguage,

    searchQuery: state.searchQuery,
  }));

  const [searchParams] = useSearchParams();

  return searchQuery || (searchParams.get("q") as string) || "";
};

export default useSearchQuery;
