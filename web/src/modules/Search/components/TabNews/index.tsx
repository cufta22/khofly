import { Button, Center, Divider, Flex, Stack, Text } from "@mantine/core";
import type { ISearXNGResultsNews } from "@ts/searxng.types";
import { useEffect } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";

import classes from "./styles.module.scss";
import NewsRow from "./components/NewsRow";
import SearchResultSkeleton from "../TabGeneral/components/GeneralSkeleton";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";

const TabNews = () => {
  const hydrated = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<ISearXNGResultsNews>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex className={classes.tag_news} align="flex-start">
      {/* Search results */}
      <Stack className={classes.stack} py="xl">
        {/* Search Options */}
        <SearchOptions className={classes.search_options_news} />

        {data?.map((res, i) => {
          if (!res?.results) return;
          return (
            <Stack gap="lg" key={i}>
              {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

              {res?.results.map((r, i) => (
                <NewsRow key={i} rowData={r} />
              ))}
            </Stack>
          );
        })}

        {(isLoading || isValidating || !hydrated) &&
          // Loading state
          Array.from(Array(10).keys()).map((e, i) => <SearchResultSkeleton key={i} />)}

        {error && (
          // Error state
          <Text>RIP results</Text>
        )}

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
    </Flex>
  );
};

export default TabNews;
