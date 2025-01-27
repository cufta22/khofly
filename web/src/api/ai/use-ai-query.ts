import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { WorkerResponse } from "./types";
import useSWR from "swr";
import useSearchQuery from "@hooks/use-search-query";

const getKey = (query: string) => {
  if (!query) return null;

  return `api-ai-${query}`;
};

const useAISWR = () => {
  const { fetchData } = useFetch();

  const q = useSearchQuery();

  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const fetcher = (key: string) => {
    console.log("Worker domain: " + workerDomain);

    return fetchData(`${workerDomain}?prompt=${key}`, {
      method: "GET",
    }) as Promise<WorkerResponse>;
  };

  return useSWR<WorkerResponse>(getKey(q), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useAISWR;
