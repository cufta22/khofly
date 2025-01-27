import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import { useSettingsStore } from "@store/settings";

// Restart SearXNG
// sudo systemctl reload nginx
// sudo service uwsgi restart searxng

const useAutocompleteSWR = () => {
  const { fetchData } = useFetch();

  const autocompleteEngine = useSettingsStore((state) => state.autocompleteEngine);

  // ----------------------------------------------------------------------------
  // General search results - default
  // ----------------------------------------------------------------------------

  const fetcher = async (_key: string, { arg }: { arg: string }) => {
    const res = await fetchData(`/api/autocomplete?q=${arg}&engine=${autocompleteEngine}`);

    return res as string[];
  };

  return useSWRMutation("autocomplete-results", fetcher);
};

export default useAutocompleteSWR;
