import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import { OpenWeatherResponse } from "./types";
import useSWR from "swr";

interface Args {
  lat: any;
  lon: any;
  units: "standard" | "metric" | "imperial";
}

const useWeatherSWR = (args: Args) => {
  const { fetchData } = useFetch();
  const { lat, lon, units } = args;

  const fetcher = (_key: string) => {
    return fetchData(`/api/weather?lat=${lat}&lon=${lon}&units=${units}`, {
      method: "GET",
    });
  };

  return useSWR<OpenWeatherResponse>(`api-weather-${args.units}`, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useWeatherSWR;
