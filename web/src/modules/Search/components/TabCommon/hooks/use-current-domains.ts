import { ICategories } from "@store/settings";
import { type ISearXNGResultsShared } from "@ts/searxng.types";
import { useEffect } from "react";
import { removeSubdomain } from "../../components/Organize/components/utils";
import { useSearchStore } from "@store/search";

export const useCurrentDomains = (data: ISearXNGResultsShared[], tab: ICategories) => {
  const setDomainsCurrent = useSearchStore((state) => state.setDomainsCurrent);

  // Update current domains for organize
  useEffect(() => {
    // Only for general
    if (!data?.length) return;
    if (tab !== "general") return;

    const dataCopy = [...data];

    const pageData = dataCopy.reduce<ISearXNGResultsShared["results"][0][]>(
      (accumulator, currentObject) => {
        if (currentObject?.results) {
          accumulator.push(...currentObject.results);
        }
        return accumulator;
      },
      [],
    );
    if (!pageData) return;

    const uniqueDomains: string[] = pageData.map((result: ISearXNGResultsShared["results"][0]) => {
      return removeSubdomain(result?.parsed_url?.[1]);
    });

    setDomainsCurrent([...new Set(uniqueDomains)]);

    return () => {
      setDomainsCurrent([]);
    };
  }, [data]);
};
