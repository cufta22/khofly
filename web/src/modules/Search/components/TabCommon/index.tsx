import { useEffect, useState } from "react";
import { Button, Center, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import Suggestions from "../components/Suggestions";
import Infobox from "../components/Infobox";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import UnresponsiveInfobox from "../components/UnresponsiveInfobox";
import { ICategories, useSettingsStore } from "@store/settings";
import type {
  ISearXNGResultsGeneral,
  ISearXNGResultsImages,
  ISearXNGResultsVideos,
} from "@ts/searxng.types";
import Lyricsbox from "../components/Lyricsbox";

import AISummary from "../components/AISummary";
import { useCurrentDomains } from "./hooks/use-current-domains";
import LayoutGeneral from "./layouts/LayoutGeneral";
import SkeletonCommon from "./components/SkeletonCommon";
import AIAnswer from "../components/AIAnswer";
import InstantAnswer from "../components/InstantAnswer";
import LayoutImages from "./layouts/LayoutImages";
import ImageView from "../components/ImageView";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import LayoutVideos from "./layouts/LayoutVideos";
import ButtonLoadMore from "./components/ButtonLoadMore";
import LayoutCommon from "./layouts/LayoutCommon";

interface Props {
  tab: ICategories;
}

const TabCommon: React.FC<Props> = ({ tab }) => {
  const hydratedEngines = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } = useSearXNGSWR<any>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydratedEngines) {
      mutate();
    }
  }, [hydratedEngines]);

  // Update current domains for organize
  useCurrentDomains(data || [], tab);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  // -----------------------------------------------------------------------------
  // Render logic
  // -----------------------------------------------------------------------------
  const renderLayout = () => {
    const dataToUse = isLoading || isValidating || !hydratedEngines ? [] : data;

    switch (tab) {
      case "general":
        return (
          <LayoutGeneral
            tab={tab}
            data={dataToUse || []}
            showSkeleton={isLoading || isValidating || !hydratedEngines}
          />
        );
      case "images":
        return (
          <LayoutImages
            tab={tab}
            data={(dataToUse as ISearXNGResultsImages[]) || []}
            showSkeleton={isLoading || isValidating || !hydratedEngines}
          />
        );
      case "videos":
        return (
          <LayoutVideos
            tab={tab}
            data={(dataToUse as ISearXNGResultsVideos[]) || []}
            showSkeleton={isLoading || isValidating || !hydratedEngines}
          />
        );

      default:
        return (
          <LayoutCommon
            tab={tab}
            data={(data as ISearXNGResultsVideos[]) || []}
            showSkeleton={isLoading || isValidating || !hydratedEngines}
          />
        );
    }
  };

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
        { [classes.tab_videos]: tab === "videos" }
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
            { [classes.search_options_videos]: tab === "videos" }
          )}
        />

        {/* AI Answer, optional */}
        {["general"].includes(tab) && <AIAnswer />}

        {/* Instant Answer, optional */}
        {["general"].includes(tab) && <InstantAnswer />}

        {/* Layout based on current tab */}
        {renderLayout()}

        {error && (
          // Error state
          <Text>An error has occurred</Text>
        )}

        {data?.[0]?.suggestions?.length && !isLoading && !isValidating ? (
          <Suggestions suggestions={data?.[0]?.suggestions} type="search" />
        ) : null}

        {isRateLimit && (
          // Rate limit
          <Text>Too Many Requests</Text>
        )}

        {!isLoading &&
          !isValidating &&
          data &&
          data?.length >= 1 &&
          data?.[0]?.results?.length < 1 &&
          !isRateLimit && <Center py="xs">No results, try with different query</Center>}

        {!isLoading &&
          !isValidating &&
          data &&
          data?.length >= 1 &&
          data?.[0]?.results?.length >= 1 &&
          !isRateLimit && <ButtonLoadMore tab={tab} onClick={() => setSize(size + 1)} />}

        {["general", "news", "music", "it", "science", "files", "social_media"].includes(tab) && (
          <ScrollToTop />
        )}
      </Stack>

      {/* Infoboxes */}
      <Flex direction="column" gap="xl" pt="xl">
        {["general"].includes(tab) &&
          !isLoading &&
          !isValidating &&
          !isRateLimit &&
          data &&
          data?.[0]?.infoboxes?.length >= 1 && <Infobox {...data[0].infoboxes[0]} />}

        {["general", "music"].includes(tab) && <Lyricsbox />}

        {["general", "news", "music", "it", "science", "files", "social_media"].includes(tab) &&
          !isLoading &&
          !isValidating &&
          !isRateLimit &&
          data &&
          data?.[0]?.unresponsive_engines?.length >= 1 && (
            <UnresponsiveInfobox unresponsive_engines={data?.[0]?.unresponsive_engines} />
          )}

        {["general", "news", "music", "it", "science", "files", "social_media"].includes(tab) &&
        data?.[0]?.suggestions?.length &&
        !isLoading &&
        !isValidating ? (
          <Suggestions suggestions={data?.[0]?.suggestions} type="infobox" />
        ) : null}
      </Flex>

      {/* AI Summary */}
      {["general"].includes(tab) && <AISummary />}
    </Flex>
  );
};

export default TabCommon;
