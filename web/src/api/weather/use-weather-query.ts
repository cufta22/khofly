import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { OpenWeatherResponse } from "./types";
import useSWR from "swr";
import type { IAPIResponse } from "@ts/global.types";
import useToast from "@hooks/use-toast";

interface Args {
  lat: any;
  lon: any;
  units: "standard" | "metric" | "imperial";
  src: "owm" | "om";
}

const getKey = (apiDomain: string, args: Args) => {
  if (!apiDomain) return null;

  return `api-weather-${args.units}-${args.src}`;
};

const useWeatherSWR = (args: Args) => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const { lat, lon, units, src } = args;

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string) => {
    return fetchData(`${apiDomain}/weather?lat=${lat}&lon=${lon}&units=${units}&src=${src}`, {
      method: "GET",
    }) as Promise<IAPIResponse<OpenWeatherResponse>>;
  };

  return useSWR<IAPIResponse<OpenWeatherResponse>>(getKey(apiDomain, args), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
    onSuccess(res) {
      if (res?.error) {
        toast.show({ message: res.message, color: "red" });
        return;
      }
    },
  });
};

export default useWeatherSWR;
