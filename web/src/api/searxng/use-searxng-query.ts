import useFetch from "../use-fetch";
import { useSearchStore, type IDateRange, type ISafeSearch, type ISearchLang } from "@store/search";
import useSWRInfinite from "swr/infinite";
import { getEngineBangs } from "./utils";
import { useSearchParams } from "react-router";

import { useInstanceStore } from "@store/instance";
import { type IOtherEngines, useEnginesStore } from "@store/engines";
import type { ICategories } from "@store/settings";
import useToast from "@hooks/use-toast";
import { ISearXNGResultsShared } from "@ts/searxng.types";

const getKey = (
  pageIndex: number,
  previousPageData: any,
  tab: ICategories,
  q: string,
  enginesSelected: string[],
  enginesOther: IOtherEngines[],
  safeSearch: ISafeSearch,
  dateRange: IDateRange,
  searchLanguage: ISearchLang,
) => {
  if (previousPageData && !previousPageData?.results?.length) return null; // reached the end
  if (!q) return null; // prevent empty search

  // Query starts with ! for search with specific engine
  const hasSpecificEngine = q.startsWith("!");

  const engineBangs = hasSpecificEngine ? "" : getEngineBangs(tab, enginesSelected, enginesOther);
  const query = encodeURIComponent(q);
  const catgParam = `&categories=${tab}`;
  const pageParam = `&pageno=${pageIndex + 1}`;
  const safeParam = `&safesearch=${safeSearch}`;
  const dateParam = dateRange === "all" ? "" : `&time_range=${dateRange}`;
  const langParam = searchLanguage === "all" ? "" : `&language=${searchLanguage}`;

  // SWR key
  return `/search?q=${engineBangs}${query}${catgParam}${pageParam}${safeParam}${dateParam}${langParam}&format=json`;
};

interface Args {
  initialPageData: ISearXNGResultsShared | null;
  initialTab: ICategories;
}

const useSearXNGSWR = (args: Args) => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const { initialPageData, initialTab } = args;

  const searXNGDomain = useInstanceStore((state) => state.searXNGDomain);

  const enginesGeneral = useEnginesStore((state) => state.enginesGeneral);
  const enginesImages = useEnginesStore((state) => state.enginesImages);
  const enginesVideos = useEnginesStore((state) => state.enginesVideos);
  const enginesNews = useEnginesStore((state) => state.enginesNews);
  const enginesMusic = useEnginesStore((state) => state.enginesMusic);
  const enginesIT = useEnginesStore((state) => state.enginesIT);
  const enginesScience = useEnginesStore((state) => state.enginesScience);
  const enginesFiles = useEnginesStore((state) => state.enginesFiles);
  const enginesSocialMedia = useEnginesStore((state) => state.enginesSocialMedia);
  const enginesOther = useEnginesStore((state) => state.enginesOther);

  const safeSearch = useSearchStore((state) => state.safeSearch);
  const dateRange = useSearchStore((state) => state.dateRange);
  const searchLanguage = useSearchStore((state) => state.searchLanguage);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const [searchParams] = useSearchParams();
  const q = searchQuery || (searchParams.get("q") as string) || "";
  const tab = initialTab || (searchParams.get("tab") as ICategories) || "general";

  const fetcher = (key: string) => {
    return fetchData(`${searXNGDomain}${key}`) as Promise<ISearXNGResultsShared>;
  };

  const enginesSelected = {
    general: enginesGeneral,
    images: enginesImages,
    videos: enginesVideos,
    news: enginesNews,
    music: enginesMusic,
    it: enginesIT,
    science: enginesScience,
    files: enginesFiles,
    social_media: enginesSocialMedia,

    other: enginesOther, // Used, not in UI
    maps: [], // Unused
  }[tab];

  return useSWRInfinite<ISearXNGResultsShared>(
    (idx, prev) =>
      getKey(
        idx,
        prev,
        tab,
        q,
        enginesSelected,
        enginesOther,
        safeSearch,
        dateRange,
        searchLanguage,
      ),
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      keepPreviousData: false,

      fallbackData: initialPageData ? [initialPageData] : [],
      revalidateFirstPage: false,

      // Error handling
      onError() {
        toast.show({
          title: "Something went wrong",
          message: "Unable to fetch results",
          color: "red",
        });
      },
    },
  );
};

export default useSearXNGSWR;
