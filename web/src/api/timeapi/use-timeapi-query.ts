import useSWRMutation from "swr/mutation";
import useFetch from "../use-fetch";
import type { ITimeAPITimeInResponse, ITimeAPITimeZoneResponse } from "./types";
import useToast from "@hooks/use-toast";

interface Args {
  timezone1: string;
  timezone2?: string;
  dateTime?: string;
  type: "time_in" | "time_zone";
}

export const useTimeApiSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = "https://timeapi.io";

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    if (arg.type === "time_in") {
      return fetchData(`${apiDomain}/api/time/current/zone?timeZone=${arg.timezone1}`, {
        method: "GET",
      }) as Promise<ITimeAPITimeInResponse>;
    } else {
      return fetchData(`${apiDomain}/api/conversion/converttimezone`, {
        method: "POST",
        body: JSON.stringify({
          fromTimeZone: arg.timezone1,
          dateTime: arg.dateTime,
          toTimeZone: arg.timezone2,
          dstAmbiguity: "",
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      }) as Promise<ITimeAPITimeZoneResponse>;
    }
  };

  return useSWRMutation<ITimeAPITimeInResponse | ITimeAPITimeZoneResponse, any, any, Args>(
    apiDomain,
    fetcher,
    {
      // Error handling
      onError() {
        toast.show({
          title: "Something went wrong",
          message: "Unable to fetch time data",
          color: "red",
        });
      },
    }
  );
};
