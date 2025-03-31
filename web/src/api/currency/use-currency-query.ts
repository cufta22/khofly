import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { OXRResponse } from "./types";
import useSWR from "swr";

const getKey = (apiDomain: string) => {
  if (!apiDomain) return null;

  return `api-currency`;
};

const useCurrencySWR = () => {
  const { fetchData } = useFetch();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string) => {
    return fetchData(`${apiDomain}/rates`, {
      method: "GET",
    }) as Promise<OXRResponse>;
  };

  return useSWR<OXRResponse>(getKey(apiDomain), fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useCurrencySWR;
