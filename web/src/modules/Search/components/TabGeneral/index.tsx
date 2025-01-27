import { useEffect } from "react";
import InstantAnswer from "./components/InstantAnswer";
import SearchResultRow from "./components/SearchResultRow";
import { Button, Center, Divider, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";
import SearchResultSkeleton from "./components/SearchResultSkeleton";
import Suggestions from "../components/Suggestions";
import Infobox from "../components/Infobox";
import Lyricsbox from "../components/Lyricsbox";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import UnresponsiveInfobox from "../components/UnresponsiveInfobox";
import GeneralMedia from "./components/GeneralMedia";
import { useSettingsStore } from "@store/settings";
import AIAnswer from "./components/AIAnswer";

const TabGeneral = () => {
  const hydratedEngines = useEnginesStore((state) => state.hydrated);

  const displayMedia = useSettingsStore((state) => state.displayMedia);
  const hydratedSettings = useSettingsStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<ISearXNGResultsGeneral>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydratedEngines) {
      mutate();
    }
  }, [hydratedEngines]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex className={classes.tab_general} align="flex-start">
      {/* Search results */}
      <Stack className={classes.stack} py="xl">
        {/* Search Options */}
        <SearchOptions className={classes.search_options_general} />

        <InstantAnswer />

        {data?.map((res, i) => {
          if (!res?.results) return;
          return (
            <Stack gap="lg" key={i}>
              {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

              {displayMedia && i === 0 && hydratedSettings ? (
                // Display images/videos in between results
                <>
                  {res?.results.slice(0, 2).map((r, i) => (
                    <SearchResultRow key={i} data={r} />
                  ))}

                  <GeneralMedia />

                  {res?.results.slice(2).map((r, i) => (
                    <SearchResultRow key={i} data={r} />
                  ))}
                </>
              ) : (
                // Display just results
                res?.results.map((r, i) => <SearchResultRow key={i} data={r} />)
              )}
            </Stack>
          );
        })}

        {(isLoading || isValidating || !hydratedEngines) &&
          // Loading state
          Array.from(Array(10).keys()).map((e, i) => <SearchResultSkeleton key={i} />)}

        {error && (
          // Error state
          <Text>RIP results</Text>
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
          !isRateLimit && (
            <Button
              variant="filled"
              onClick={() => setSize(size + 1)}
              size="md"
              color="dark.5"
            >
              Load more
            </Button>
          )}

        <ScrollToTop />
      </Stack>

      {/* Infoboxes */}
      <Flex direction="column" gap="xl" pt="xl">
        <AIAnswer />

        {!isLoading &&
          !isValidating &&
          !isRateLimit &&
          data &&
          data?.[0]?.infoboxes?.length >= 1 && <Infobox {...data[0].infoboxes[0]} />}

        <Lyricsbox />

        {!isLoading &&
          !isValidating &&
          !isRateLimit &&
          data &&
          data?.[0]?.unresponsive_engines?.length >= 1 && (
            <UnresponsiveInfobox unresponsive_engines={data?.[0]?.unresponsive_engines} />
          )}
        {data?.[0]?.suggestions?.length && !isLoading && !isValidating ? (
          <Suggestions suggestions={data?.[0]?.suggestions} type="infobox" />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default TabGeneral;
