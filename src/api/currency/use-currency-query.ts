import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { OXRResponse } from "./types";
import useSWR from "swr";

const useCurrencySWR = () => {
  const { fetchData } = useFetch();

  const { searXNGDomain } = useInstanceStore((state) => ({
    searXNGDomain: state.searXNGDomain,
  }));

  const fetcher = (_key: string) => {
    return fetchData(`${searXNGDomain}/rates`, {
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
