import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { OXRResponse } from "./types";
import useSWR from "swr";
import useToast from "@hooks/use-toast";
import type { IAPIResponse } from "@ts/global.types";

const getKey = (apiDomain: string) => {
  if (!apiDomain) return null;

  return `api-currency`;
};

const useCurrencySWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string) => {
    return fetchData(`${apiDomain}/rates`, {
      method: "GET",
    }) as Promise<IAPIResponse<OXRResponse>>;
  };

  return useSWR<IAPIResponse<OXRResponse>>(getKey(apiDomain), fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,

    // Error handling
    onSuccess(res) {
      if (res?.error) {
        toast.show({ title: "Something went wrong", message: res?.message, color: "red" });
      }
    },
    onError() {
      toast.show({
        title: "Something went wrong",
        message: "Unable to fetch exchange rates",
        color: "red",
      });
    },
  });
};

export default useCurrencySWR;
