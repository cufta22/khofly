import { useEffect, useState } from "react";
import { Button, Center, Divider, Flex, Stack, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import ScrollToTop from "../../../../common/components/ScrollToTop";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import Suggestions from "../components/Suggestions";
import Infobox from "../components/Infobox";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import UnresponsiveInfobox from "../components/UnresponsiveInfobox";
import type { ICategories } from "@store/settings";
import type { ISearXNGResultsGeneral, ISearXNGResultsImages } from "@ts/searxng.types";
import AIAnswer from "../TabGeneral/components/AIAnswer";
import InstantAnswer from "../TabGeneral/components/InstantAnswer";
import GeneralSkeleton from "../TabGeneral/components/GeneralSkeleton";
import { CATEGORY_TO_COMPONENTS } from "./utils";
import { useDisclosure } from "@mantine/hooks";
import ImageView from "../TabImages/components/ImageView";
import PrivateVideoPlayer from "../components/PrivatePlayer/videos";

const TabMultiple = () => {
  const hydratedEngines = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<ISearXNGResultsGeneral>();

  const [isOpenImageView, { open: openImageView, close: closeImageView }] = useDisclosure(false);
  const [viewImage, setViewImage] = useState<ISearXNGResultsImages["results"][0] | null>(null);

  const [privatePlayerURL, setPrivatePlayerURL] = useState("");

  const openImageInView = (img: ISearXNGResultsImages["results"][0]) => {
    setViewImage(img);
    openImageView();
  };

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydratedEngines) {
      mutate();
    }
  }, [hydratedEngines]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex className={classes.tab_multiple} align="flex-start">
      {/* Search results */}
      <Stack className={classes.stack} py="xl">
        {/* Search Options */}
        <SearchOptions className={classes.search_options_multiple} />

        {/* AI Answer, optional */}
        <AIAnswer />

        {/* Instant Answer, optional */}
        <InstantAnswer />

        {data?.map((res, i) => {
          if (typeof res === "string") return;

          if (!res?.results) return;

          return (
            <Flex gap="lg" key={i} direction="row" wrap={"wrap"}>
              {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

              {res?.results.map((r, i) => {
                const MultipleRow = CATEGORY_TO_COMPONENTS[r.category as ICategories];

                return (
                  <MultipleRow
                    key={i}
                    rowData={r}
                    // For images
                    openImageInView={openImageInView}
                    // For videos
                    setPrivatePlayerURL={setPrivatePlayerURL}
                  />
                );
              })}
            </Flex>
          );
        })}

        {(isLoading || isValidating || !hydratedEngines) &&
          // Loading state
          Array.from(Array(10).keys()).map((e, i) => <GeneralSkeleton key={i} />)}

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
          data?.[0]?.infoboxes?.length >= 1 && <Infobox {...data[0].infoboxes[0]} />}

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

      {/* For images */}
      <ImageView isOpen={isOpenImageView} handleClose={closeImageView} viewImage={viewImage} />

      {/* Private Video Player */}
      <PrivateVideoPlayer
        url={privatePlayerURL}
        onClose={() => {
          setPrivatePlayerURL("");
        }}
      />
    </Flex>
  );
};

export default TabMultiple;
