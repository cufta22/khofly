import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { IWorkerTextGenResponse } from "./types";
import useSWR from "swr";

interface Args {
  prompt: any;
}

const getKey = (domain: string, model?: string) => {
  if (!domain) return null;

  return `api-ai-${domain}-${model}`;
};

const useAISWR = (args: Args) => {
  const { fetchData } = useFetch();

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const workerModel = useInstanceStore((state) => state.workerModel);

  const fetcher = (_key: string) => {
    // Cloudflare AI Worker
    return fetchData(`${workerDomain}?prompt=${args?.prompt}&model=${workerModel}`, {
      method: "GET",
    }) as Promise<IWorkerTextGenResponse>;
  };

  return useSWR<IWorkerTextGenResponse>(getKey(workerDomain, workerModel), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
};

export default useAISWR;
