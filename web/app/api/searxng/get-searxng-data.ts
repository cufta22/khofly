import { type IOtherEngines } from "@store/engines";
import { type IDateRange, type ISafeSearch, type ISearchLang } from "@store/search";
import { type ICategories } from "@store/settings";
import { ISearXNGResultsShared } from "@ts/searxng.types";
import { getCookie } from "@utils/functions/cookies";
import { getEngineBangs } from "src/api/searxng/utils";

const getApiPath = (
  tab: ICategories,
  q: string,
  enginesSelected: string[],
  enginesOther: IOtherEngines[],
  safeSearch: ISafeSearch,
  dateRange: IDateRange,
  searchLanguage: ISearchLang,
) => {
  if (!q) return null; // prevent empty search

  // Query starts with ! for search with specific engine
  const hasSpecificEngine = q.startsWith("!");

  const engineBangs = hasSpecificEngine ? "" : getEngineBangs(tab, enginesSelected, enginesOther);
  const query = encodeURIComponent(q);
  const catgParam = `&categories=${tab}`;
  const pageParam = `&pageno=1`;
  const safeParam = `&safesearch=${safeSearch}`;
  const dateParam = dateRange === "all" ? "" : `&time_range=${dateRange}`;
  const langParam = searchLanguage === "all" ? "" : `&language=${searchLanguage}`;

  // Loader path
  return `/search?q=${engineBangs}${query}${catgParam}${pageParam}${safeParam}${dateParam}${langParam}`;
};

const getSearXNGData = async (
  request: Request,
  initialTab?: ICategories,
): Promise<ISearXNGResultsShared> => {
  const searXNGDomain = process.env.SEARXNG_URL_LOCAL;

  const enginesStoreCookie = getCookie("app-engines-store", request);
  const enginesStoreData = JSON.parse(enginesStoreCookie);

  const enginesGeneral = enginesStoreData?.state?.enginesGeneral || [];
  const enginesImages = enginesStoreData?.state?.enginesImages || [];
  const enginesVideos = enginesStoreData?.state?.enginesVideos || [];
  const enginesNews = enginesStoreData?.state?.enginesNews || [];
  const enginesMusic = enginesStoreData?.state?.enginesMusic || [];
  const enginesIT = enginesStoreData?.state?.enginesIT || [];
  const enginesScience = enginesStoreData?.state?.enginesScience || [];
  const enginesFiles = enginesStoreData?.state?.enginesFiles || [];
  const enginesSocialMedia = enginesStoreData?.state?.enginesSocialMedia || [];
  const enginesOther = enginesStoreData?.state?.enginesOther || [];

  const searchStoreCookie = getCookie("app-search-store", request);
  const searchStoreData = JSON.parse(searchStoreCookie);

  const safeSearch = searchStoreData?.state?.safeSearch || "0";
  const dateRange = searchStoreData?.state?.dateRange || "all";
  const searchLanguage = searchStoreData?.state?.searchLanguage || "all";
  const searchQuery = searchStoreData?.state?.searchQuery || "";

  const url = new URL(request.url);
  const q = searchQuery || (url.searchParams.get("q") as string) || "";
  const tab = initialTab || (url.searchParams.get("tab") as ICategories) || "general";

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

  const apiPath = getApiPath(
    tab,
    q,
    enginesSelected,
    enginesOther,
    safeSearch,
    dateRange,
    searchLanguage,
  );

  console.log(`${searXNGDomain}${apiPath}&format=json`);

  const res = await fetch(`${searXNGDomain}${apiPath}&format=json`);
  const data = await res.json();

  return data;
};

export default getSearXNGData;
