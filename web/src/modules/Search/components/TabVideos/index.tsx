import { Button, Center, Flex, SimpleGrid, Text } from "@mantine/core";
import type { ISearXNGResultsVideos } from "@ts/searxng.types";
import { useEffect, useState } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import VideoCell from "./components/VideoCell";
import VideoSkeleton from "./components/VideoSkeleton";

import classes from "./styles.module.scss";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import PrivateVideoPlayer from "../components/PrivatePlayer/videos";

const TabVideos = () => {
  const hydrated = useEnginesStore((state) => state.hydrated);

  const [privatePlayerURL, setPrivatePlayerURL] = useState("");

  const { data, error, isLoading, isValidating, setSize, size, mutate } =
    useSearXNGSWR<ISearXNGResultsVideos>();

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  return (
    <Flex className={classes.tab_videos} direction="column">
      {/* Search Options */}
      <SearchOptions className={classes.search_options_videos} />

      {error && (
        // Error state
        <Text>RIP images</Text>
      )}

      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
        p="lg"
      >
        {data?.map((res) => {
          if (!res) return;
          return res?.results.map((vid, i) => (
            <VideoCell key={i} rowData={vid} setPrivatePlayerURL={setPrivatePlayerURL} />
          ));
        })}

        {(isLoading || isValidating || !hydrated) &&
          // Loading state
          Array.from(Array(30).keys()).map((e, i) => <VideoSkeleton key={i} />)}
      </SimpleGrid>

      {!isLoading && data && data?.length >= 1 && (
        <Center py="xl">
          <Button
            variant="filled"
            onClick={() => {
              setSize(size + 1);
            }}
            size="lg"
            color="dark.5"
          >
            Load more
          </Button>
        </Center>
      )}

      {/* Private Player */}
      <PrivateVideoPlayer
        url={privatePlayerURL}
        onClose={() => {
          setPrivatePlayerURL("");
        }}
      />
    </Flex>
  );
};

export default TabVideos;
