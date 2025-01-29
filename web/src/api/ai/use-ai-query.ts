import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { WorkerResponse } from "./types";
import useSWRMutation from "swr/mutation";

const getKey = (domain: string) => {
  if (!domain) return null;

  return `api-ai`;
};

const useAISWR = () => {
  const { fetchData } = useFetch();

  const domain = useInstanceStore((state) => state.workerDomain);

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${domain}?prompt=${arg}`, {
      method: "GET",
    }) as Promise<WorkerResponse>;
  };

  return useSWRMutation<WorkerResponse, any, any, string>(getKey(domain), fetcher, {});
};

export default useAISWR;
