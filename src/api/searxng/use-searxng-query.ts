import useFetch from "../use-fetch";
import {
  IDateRange,
  ISafeSearch,
  ISearchLang,
  useSearchStore,
} from "@store/search";
import useSWRInfinite from "swr/infinite";
import { getEngineBangs } from "./utils";

import { useSearchParams } from "@remix-run/react";
import { useInstanceStore } from "@store/instance";
import { useEnginesStore } from "@store/engines";
import { ICategories } from "@store/settings";

const getKey = (
  pageIndex: number,
  previousPageData: any,
  tab: ICategories,
  q: string,
  enginesSelected: string[],
  safeSearch: ISafeSearch,
  dateRange: IDateRange,
  searchLanguage: ISearchLang
) => {
  if (previousPageData && !previousPageData?.results?.length) return ""; // reached the end
  if (!q) return ""; // prevent empty search

  const engineBangs = getEngineBangs(tab, enginesSelected);

  const catgParam = `&categories=${tab}`;
  const pageParam = `&pageno=${pageIndex + 1}`;
  const safeParam = `&safesearch=${safeSearch}`;
  const dateParam = dateRange === "all" ? "" : `&time_range=${dateRange}`;
  const langParam =
    searchLanguage === "all" ? "" : `&language=${searchLanguage}`;

  // SWR key
  return `/search?q=${engineBangs}${encodeURIComponent(
    q
  )}${catgParam}${pageParam}${safeParam}${dateParam}${langParam}`;
};

const useSearXNGSWR = <IResults>() => {
  const { fetchData } = useFetch();

  const { domain: searxngDomain } = useInstanceStore((state) => ({
    domain: state.searXNGDomain,
  }));

  const {
    enginesGeneral,
    enginesImages,
    enginesVideos,
    enginesNews,
    enginesMusic,
    enginesIT,
  } = useEnginesStore((state) => ({
    enginesGeneral: state.enginesGeneral,
    enginesImages: state.enginesImages,
    enginesVideos: state.enginesVideos,
    enginesNews: state.enginesNews,
    enginesMusic: state.enginesMusic,
    enginesIT: state.enginesIT,
  }));

  const { safeSearch, dateRange, searchLanguage, searchQuery } = useSearchStore(
    (state) => ({
      safeSearch: state.safeSearch,
      dateRange: state.dateRange,
      searchLanguage: state.searchLanguage,

      searchQuery: state.searchQuery,
    })
  );

  const [searchParams] = useSearchParams();
  const q = searchQuery || (searchParams.get("q") as string) || "";
  const tab = (searchParams.get("tab") as ICategories) || "general";

  const fetcher = (_key: string) => {
    return fetchData(`${searxngDomain}${_key}&format=json`);
  };

  const enginesSelected = {
    general: enginesGeneral,
    images: enginesImages,
    videos: enginesVideos,
    news: enginesNews,
    maps: [],
    music: enginesMusic,
    it: enginesIT,
    science: [],
    files: [],
    social_media: [],
  }[tab];

  return useSWRInfinite<IResults>(
    (idx, prev) =>
      getKey(
        idx,
        prev,
        tab,
        q,
        enginesSelected,
        safeSearch,
        dateRange,
        searchLanguage
      ),
    fetcher,
    {
      // populateCache
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      keepPreviousData: false,
    }
  );
};

export default useSearXNGSWR;
