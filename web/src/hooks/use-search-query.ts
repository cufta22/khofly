import { useSearchStore } from "@store/search";
import { useSearchParams } from "react-router";

const useSearchQuery = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const [searchParams] = useSearchParams();

  return searchQuery || (searchParams.get("q") as string) || "";
};

export default useSearchQuery;
