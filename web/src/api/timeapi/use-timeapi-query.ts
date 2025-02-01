import useSWRMutation from "swr/mutation";
import useFetch from "../use-fetch";
import { TimeAPITimezoneResponse } from "./types";

interface Args {
  timezone: string;
}

export const useTimeApiTimezoneSWR = () => {
  const { fetchData } = useFetch();

  const apiDomain = "https://timeapi.io";

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    return fetchData(`${apiDomain}/api/time/current/zone?timeZone=${arg.timezone}`, {
      method: "GET",
    }) as Promise<TimeAPITimezoneResponse>;
  };

  return useSWRMutation<TimeAPITimezoneResponse, any, any, Args>(apiDomain, fetcher, {});
};
