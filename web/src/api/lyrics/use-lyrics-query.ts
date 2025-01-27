import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import useSearchQuery from "@hooks/use-search-query";

interface ILyricsResponse {
  lyrics: string;
  title: string;
  artist: string;
  image: string;
}

interface Args {
  initialQ: any;
}

const getKey = (apiDomain: string, query: string) => {
  if (!apiDomain) return null;

  return `api-lyrics-${encodeURIComponent(query)}`;
};

const useLyricsSWR = (args?: Args) => {
  const { fetchData } = useFetch();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const q = useSearchQuery();

  const query =
    args?.initialQ || q.replace("lyrics", "") || "Never gonna give you up";

  const fetcher = (_key: string) => {
    return fetchData(`${apiDomain}/lyrics?q=${encodeURIComponent(query)}`, {
      method: "GET",
    }) as Promise<ILyricsResponse>;
  };

  return useSWR<ILyricsResponse>(getKey(apiDomain, query), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
};

export default useLyricsSWR;
