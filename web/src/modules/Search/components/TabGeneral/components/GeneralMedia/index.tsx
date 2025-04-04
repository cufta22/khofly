import useSearchQuery from "@hooks/use-search-query";
import { Avatar, Button, Divider, Flex, Grid, Image, Stack, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import { IconPhoto, IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";
import type {
  ISearXNGResultsBlank,
  ISearXNGResultsImages,
  ISearXNGResultsVideos,
} from "@ts/searxng.types";
import { useEffect } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";

import classes from "./styles.module.scss";
import { nprogress } from "@mantine/nprogress";
import { useEnginesStore } from "@store/engines";
import { useNavigate } from "react-router";
import { useResponsive } from "@hooks/use-responsive";

const GeneralMedia = () => {
  const selectedMedia = useSettingsStore((state) => state.selectedMedia);
  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const hydrated = useEnginesStore((state) => state.hydrated);

  const isSm = useResponsive("max", "sm");

  const { data, mutate } = useSearXNGSWR<ISearXNGResultsBlank>(selectedMedia);

  const navigate = useNavigate();
  const q = useSearchQuery();

  const handleOpenMedia = (media_src?: string) => {
    nprogress.start();

    const mediaParam = media_src ? `&media_src=${media_src}` : "";

    // Handle Private Search
    if (privateSearch) {
      return navigate(`/search?tab=${selectedMedia}${mediaParam}`);
    }

    navigate(`/search?q=${encodeURIComponent(q)}&tab=${selectedMedia}${mediaParam}`);
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
        <Grid grow gutter="xs" columns={isSm ? 2 : 5}>
          {data?.map((res) => {
            if (!res) return null;

            return res?.results
              .slice(0, isSm ? 4 : 10)
              .map((img: ISearXNGResultsImages["results"][0], i: number) => (
                <Grid.Col key={i} span={1}>
                  <Image
                    className={classes.general_media_img}
                    h={150}
                    w="100%"
                    radius="xs"
                    src={img?.thumbnail_src}
                    onClick={() => handleOpenMedia(img?.img_src || "")}
                  />
                </Grid.Col>
              ));
          })}
        </Grid>
      )}

      {selectedMedia === "videos" && (
        <Grid grow gutter="xs" columns={isSm ? 2 : 4}>
          {data?.map((res) => {
            if (!res) return null;

            return res?.results
              .slice(0, isSm ? 4 : 8)
              .map((img: ISearXNGResultsVideos["results"][0], i: number) => (
                <Grid.Col key={i} span={1}>
                  <div className={classes.general_media_vid}>
                    <Image
                      className={classes.image}
                      // h={150}
                      // w="100%"
                      radius="xs"
                      src={img?.thumbnail}
                      onClick={() => handleOpenMedia("")}
                    />

                    <Avatar className={classes.play_icon} variant="filled" color="dark.5">
                      <IconPlayerPlayFilled />
                    </Avatar>
                  </div>
                </Grid.Col>
              ));
          })}
        </Grid>
      )}

      <Divider
        my="md"
        labelPosition="center"
        label={
          <Button variant="default" size="xs" onClick={() => handleOpenMedia()}>
            More {selectedMedia}
          </Button>
        }
      />
    </Stack>
  );
};

export default GeneralMedia;
