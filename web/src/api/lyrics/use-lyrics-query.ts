import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import useSWR from "swr";
import useSearchQuery from "@hooks/use-search-query";
import useToast from "@hooks/use-toast";
import type { IAPIResponse } from "@ts/global.types";

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
  if (!query) return;

  return `api-lyrics-${encodeURIComponent(query)}`;
};

const useLyricsSWR = (args?: Args) => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const q = useSearchQuery();

  const query =
    args?.initialQ.replace("lyrics", "") || q.replace("lyrics", "") || "Never gonna give you up";

  const fetcher = (_key: string) => {
    if (args?.initialQ ? false : !q.includes("lyrics")) return null;

    return fetchData(`${apiDomain}/lyrics?q=${encodeURIComponent(query)}`, {
      method: "GET",
    }) as Promise<IAPIResponse<ILyricsResponse>>;
  };

  return useSWR<IAPIResponse<ILyricsResponse> | null>(getKey(apiDomain, query), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,

    // Error handling
    onSuccess(res) {
      if (res?.error) {
        toast.show({ title: "Something went wrong", message: res?.message, color: "red" });
      }
    },
    onError() {
      toast.show({
        title: "Something went wrong",
        message: "Unable to fetch lyrics",
        color: "red",
      });
    },
  });
};

export default useLyricsSWR;
