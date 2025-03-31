import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { INominatimResults } from "@ts/nominatim.types";
import useSWRMutation from "swr/mutation";

const getKey = (domain: string) => {
  if (!domain) return null;

  return `api-geocode`;
};

const useNominatimSWR = () => {
  const { fetchData } = useFetch();

  const domain = useInstanceStore((state) => state.nominatimDomain);

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${domain}/search?q=${arg}&format=jsonv2`) as Promise<INominatimResults[]>;
  };

  return useSWRMutation<INominatimResults[], any, any, string>(getKey(domain), fetcher, {});
};

export default useNominatimSWR;
