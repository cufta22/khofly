import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { OpenWeatherResponse } from "./types";
import useSWR from "swr";

interface Args {
  lat: any;
  lon: any;
  units: "standard" | "metric" | "imperial";
}

const getKey = (apiDomain: string, args: Args) => {
  if (!apiDomain) return null;

  return `api-weather-${args.units}`;
};

const useWeatherSWR = (args: Args) => {
  const { fetchData } = useFetch();
  const { lat, lon, units } = args;

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string) => {
    return fetchData(
      `${apiDomain}/weather?lat=${lat}&lon=${lon}&units=${units}`,
      {
        method: "GET",
      }
    ) as Promise<OpenWeatherResponse>;
  };

  return useSWR<OpenWeatherResponse>(getKey(apiDomain, args), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useWeatherSWR;
