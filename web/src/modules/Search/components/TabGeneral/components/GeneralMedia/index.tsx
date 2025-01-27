import useSearchQuery from "@hooks/use-search-query";
import { Button, Divider, Flex, Grid, Image, Stack, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import { IconPhoto, IconPlayerPlay } from "@tabler/icons-react";
import { ISearXNGResultsBlank, ISearXNGResultsImages, ISearXNGResultsVideos } from "@ts/searxng.types";
import { useEffect } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";

import classes from "./styles.module.scss";
import { nprogress } from "@mantine/nprogress";
import { useEnginesStore } from "@store/engines";
import { useNavigate } from "react-router";

const GeneralMedia = () => {
  const selectedMedia = useSettingsStore((state) => state.selectedMedia);
  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const hydrated = useEnginesStore((state) => state.hydrated);

  const { data, isLoading, isValidating, mutate } = useSearXNGSWR<ISearXNGResultsBlank>(selectedMedia);

  const navigate = useNavigate();
  const q = useSearchQuery();

  const handleOpenMedia = (media_src?: string) => {
    nprogress.start();

    const mediaSrc = media_src ? `&media_src=${media_src}` : "";

    // Handle Private Search
    if (privateSearch) {
      return navigate(`/search?tab=${selectedMedia}${mediaSrc}`);
    }

    navigate(`/search?q=${encodeURIComponent(q)}&tab=${selectedMedia}${mediaSrc}`);
  };

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  return (
    <Stack>
      <Flex align="center" gap="sm">
        {selectedMedia === "images" && <IconPhoto />}
        {selectedMedia === "images" && <Text>Images for {q}</Text>}

        {selectedMedia === "videos" && <IconPlayerPlay />}
        {selectedMedia === "videos" && <Text>Videos for {q}</Text>}
      </Flex>

      {selectedMedia === "images" && (
        <Grid grow gutter="xs" columns={5}>
          {data?.map((res) => {
            if (!res) return null;

            return res?.results.slice(0, 10).map((img: ISearXNGResultsImages["results"][0], i: number) => (
              <Grid.Col key={i} span={1}>
                <Image
                  className={classes.general_media_img}
                  h={150}
                  w="100%"
                  radius="xs"
                  src={img?.thumbnail_src}
                  onClick={() => handleOpenMedia(img?.thumbnail_src || "")}
                />
              </Grid.Col>
            ));
          })}
        </Grid>
      )}

      {selectedMedia === "videos" && (
        <Grid grow gutter="xs" columns={4}>
          {data?.map((res) => {
            if (!res) return null;

            return res?.results.slice(0, 8).map((img: ISearXNGResultsVideos["results"][0], i: number) => (
              <Grid.Col key={i} span={1}>
                <Image
                  className={classes.general_media_img}
                  h={150}
                  w="100%"
                  radius="xs"
                  src={img?.thumbnail}
                  onClick={() => handleOpenMedia("")}
                />
              </Grid.Col>
            ));
          })}
        </Grid>
      )}

      <Divider
        my="md"
        labelPosition="center"
        label={
          <>
            <Button variant="default" size="xs" onClick={() => handleOpenMedia()}>
              More {selectedMedia}
            </Button>
          </>
        }
      />
    </Stack>
  );
};

export default GeneralMedia;
