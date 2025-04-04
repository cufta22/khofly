import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { INominatimResults } from "@ts/nominatim.types";
import useSWRMutation from "swr/mutation";
import useToast from "@hooks/use-toast";

const getKey = (domain: string) => {
  if (!domain) return null;

  return `api-geocode`;
};

const useNominatimSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const domain = useInstanceStore((state) => state.nominatimDomain);

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${domain}/search?q=${arg}&format=jsonv2`) as Promise<INominatimResults[]>;
  };

  return useSWRMutation<INominatimResults[], any, any, string>(getKey(domain), fetcher, {
    // Error handling
    onError() {
      toast.show({
        title: "Something went wrong",
        message: "Unable to fetch location",
        color: "red",
      });
    },
  });
};

export default useNominatimSWR;
