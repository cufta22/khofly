import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import { INominatimResults } from "@ts/nominatim.tyles";
import useSWRMutation from "swr/mutation";

const getKey = (domain: string) => {
  if (!domain) return null;

  return `api-geocode`;
};

const useDownloadSWR = () => {
  const { fetchData } = useFetch();

  const domain = useInstanceStore((state) => state.nominatimDomain);

  const fetcher = (key: string, { arg }: { arg: string }) => {
    return fetchData(`${domain}/search?q=${arg}&format=jsonv2`) as Promise<INominatimResults[]>;
  };

  return useSWRMutation<INominatimResults[], any, any, string>(getKey(domain), fetcher, {});
};

export default useDownloadSWR;
