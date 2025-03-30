import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import type { IAPIResponse } from "@ts/global.types";
import type { OpenWeatherGeoResponse } from "./types";
import useToast from "@hooks/use-toast";

interface Args {
  location: string;
}

const useGeocodingSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string, { arg }: { arg: Args }) => {
    const { location } = arg;

    return fetchData(`${apiDomain}/geocoding?location=${location}`, {
      method: "GET",
    }) as Promise<IAPIResponse<OpenWeatherGeoResponse>>;
  };

  return useSWRMutation<IAPIResponse<OpenWeatherGeoResponse>, any, any, Args>(
    `api-geocoding`,
    fetcher,
    {
      onSuccess(res) {
        console.log(res);

        if (!res?.data) {
          toast.show({ message: "Location not found!", color: "red" });
          return;
        }
        if (res?.error) {
          toast.show({ message: res.message, color: "red" });
          return;
        }
      },
      onError(res) {
        if (res?.error) {
          toast.show({ message: res.message, color: "red" });
          return;
        }
      },
    }
  );
};

export default useGeocodingSWR;
