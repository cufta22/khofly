import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { OXRResponse } from "./types";
import useSWR from "swr";

const useCurrencySWR = () => {
  const { fetchData } = useFetch();

  const { oxrDomain } = useInstanceStore((state) => ({
    oxrDomain: state.oxrDomain,
  }));

  const fetcher = (_key: string) => {
    return fetchData(`${oxrDomain}/rates`, {
      method: "GET",
    });
  };

  return useSWR<OXRResponse>(`api-currency`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useCurrencySWR;
