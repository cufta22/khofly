import { useEffect } from "react";

import { Button, Center, Divider, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import type { ISearXNGResultsScience } from "@ts/searxng.types";
import Suggestions from "../components/Suggestions";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import UnresponsiveInfobox from "../components/UnresponsiveInfobox";
import ScienceRow from "./components/ScienceRow";
import ScienceSkeleton from "./components/ScienceSkeleton";

const TabScience = () => {
  const hydrated = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<ISearXNGResultsScience>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex className={classes.tab_science} align="flex-start">
      {/* Search results */}
      <Stack className={classes.stack} py="xl">
        {/* Search Options */}
        <SearchOptions className={classes.search_options_science} />

        {data?.map((res, i) => {
          if (!res?.results) return;
          return (
            <Stack gap="lg" key={i}>
              {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

              {res?.results.map((r, i) => (
                <ScienceRow key={i} rowData={r} />
              ))}
            </Stack>
          );
        })}

        {(isLoading || isValidating || !hydrated) &&
          // Loading state
          Array.from(Array(10).keys()).map((e, i) => <ScienceSkeleton key={i} />)}

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
            <Button variant="filled" onClick={() => setSize(size + 1)} size="md" color="dark.5">
              Load more
            </Button>
          )}

        <ScrollToTop />
      </Stack>

      {/* Infoboxes */}

      <Flex direction="column" gap="xl" pt="xl">
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

export default TabScience;
