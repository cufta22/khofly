import { useEffect } from "react";
import { Center, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import Suggestions from "../components/Suggestions";
import Infobox from "../components/Infobox";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import UnresponsiveInfobox from "../components/UnresponsiveInfobox";
import { ICategories } from "@store/settings";
import type {
  ISearXNGResultsGeneral,
  ISearXNGResultsImages,
  ISearXNGResultsShared,
  ISearXNGResultsVideos,
} from "@ts/searxng.types";
import Lyricsbox from "../components/Lyricsbox";

import AISummary from "../components/AISummary";
import { useCurrentDomains } from "./hooks/use-current-domains";
import LayoutGeneral from "./layouts/LayoutGeneral";
import AIAnswer from "../components/AIAnswer";
import InstantAnswer from "../components/InstantAnswer";
import LayoutImages from "./layouts/LayoutImages";
import clsx from "clsx";
import LayoutVideos from "./layouts/LayoutVideos";
import ButtonLoadMore from "./components/ButtonLoadMore";
import LayoutCommon from "./layouts/LayoutCommon";
import { type ILoaderData_Search } from "app/routes/search";
import { useSWRConfig } from "swr";

interface Props {
  tab: ICategories;
  loaderData: ILoaderData_Search;
}

const TabCommon: React.FC<Props> = ({ tab, loaderData }) => {
  const hydratedEngines = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } = useSearXNGSWR({
    initialPageData: loaderData.data,
    initialTab: tab,
  });

  const { cache } = useSWRConfig();

  console.log("Current SWR Keys:", Array.from(cache.keys()));

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    // Run mutate if loaderData ends up empty
    if (!data?.length && hydratedEngines && !loaderData) {
      console.log("mutate(); called");

      mutate();
    }
  }, [hydratedEngines]);

  // Update current domains for organize
  useCurrentDomains(data || [], tab);

  // -----------------------------------------------------------------------------
  // Render logic
  // -----------------------------------------------------------------------------
  const renderLayout = () => {
    switch (tab) {
      case "general":
        return (
          <LayoutGeneral
            tab={tab}
            data={(data as ISearXNGResultsGeneral[]) || []}
            showSkeleton={isLoading || isValidating}
          />
        );
      case "images":
        return (
          <LayoutImages
            tab={tab}
            data={(data as ISearXNGResultsImages[]) || []}
            showSkeleton={isLoading || isValidating}
          />
        );
      case "videos":
        return (
          <LayoutVideos
            tab={tab}
            data={(data as ISearXNGResultsVideos[]) || []}
            showSkeleton={isLoading || isValidating}
          />
        );

      default:
        return (
          <LayoutCommon
            tab={tab}
            data={(data as ISearXNGResultsShared[]) || []}
            showSkeleton={isLoading || isValidating}
          />
        );
    }
  };

  // Render conditions
  const isProcessing = isLoading || isValidating;
  const firstPage = data?.[0];
  const hasResults = !!((firstPage?.results?.length ?? 0) > 0);
  const isRateLimit = data?.includes("Too Many Requests" as any);

  const showSuggestions =
    !isProcessing && !isRateLimit && firstPage && !!firstPage?.suggestions?.length;
  const showUnresponsive =
    !isProcessing && !isRateLimit && firstPage && !!firstPage?.unresponsive_engines?.length;
  const showInfoboxes =
    !isProcessing && !isRateLimit && firstPage && !!firstPage?.infoboxes?.length;
  const showNoResults = !isProcessing && !isRateLimit && firstPage && !hasResults;
  const showLoadMoreButton = !isProcessing && !isRateLimit && firstPage && hasResults;

  // Everything but images and videos because of the layout
  const hasInfoboxes = !["images", "videos"].includes(tab);

  return (
    <Flex
      className={clsx(
        {
          [classes.tab_common]: [
            "general",
            "news",
            "music",
            "it",
            "science",
            "files",
            "social_media",
          ].includes(tab),
        },
        { [classes.tab_images]: tab === "images" },
        { [classes.tab_videos]: tab === "videos" },
      )}
      align="flex-start"
    >
      {/* Search results */}
      <Stack
        className={classes.stack}
        py={["images", "videos"].includes(tab) ? 0 : "xl"}
        gap={["images", "videos"].includes(tab) ? 0 : "md"}
      >
        {/* Search Options */}
        <SearchOptions
          className={clsx(
            {
              [classes.search_options_common]: [
                "general",
                "news",
                "music",
                "it",
                "science",
                "files",
                "social_media",
              ].includes(tab),
            },
            { [classes.search_options_images]: tab === "images" },
            { [classes.search_options_videos]: tab === "videos" },
          )}
        />

        {/* AI Answer, optional */}
        {["general"].includes(tab) && <AIAnswer />}

        {/* Instant Answer, optional */}
        {["general"].includes(tab) && <InstantAnswer />}

        {/* Layout based on current tab */}
        {renderLayout()}

        {showSuggestions ? (
          <Suggestions suggestions={data?.[0]?.suggestions} type="search" />
        ) : null}

        {error && (
          <Text ta="center" py="xs">
            An error has occurred
          </Text>
        )}

        {isRateLimit && (
          <Text ta="center" py="xs">
            Too Many Requests
          </Text>
        )}

        {showNoResults && (
          <Text ta="center" py="xs">
            No results, try with different query
          </Text>
        )}

        {showLoadMoreButton && <ButtonLoadMore tab={tab} onClick={() => setSize(size + 1)} />}

        {hasInfoboxes && <ScrollToTop />}
      </Stack>

      {/* Infoboxes */}
      {hasInfoboxes && (
        <Flex direction="column" gap="xl" pt="xl">
          {showInfoboxes && <Infobox {...data[0].infoboxes[0]} />}

          {<Lyricsbox />}

          {showUnresponsive && (
            <UnresponsiveInfobox unresponsive_engines={data?.[0]?.unresponsive_engines} />
          )}
        </Flex>
      )}

      {/* AI Summary */}
      {["general"].includes(tab) && <AISummary />}
    </Flex>
  );
};

export default TabCommon;
