import useSearchQuery from "@hooks/use-search-query";
import { Button, Divider, Flex, Grid, Image, Stack, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";
import { IconPhoto, IconPlayerPlay } from "@tabler/icons-react";
import {
  ISearXNGResultsImages,
  ISearXNGResultsVideos,
} from "@ts/searxng.types";
import { useEffect } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";

import classes from "./styles.module.scss";
import { useNavigate } from "@remix-run/react";
import { nprogress } from "@mantine/nprogress";

type IGeneralMediaResults = ISearXNGResultsImages & ISearXNGResultsVideos;

const GeneralMedia = () => {
  const { selectedMedia, privateSearch } = useSettingsStore((state) => ({
    selectedMedia: state.selectedMedia,
    privateSearch: state.privateSearch,
  }));

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSearXNGSWR<IGeneralMediaResults>(selectedMedia);

  const navigate = useNavigate();
  const q = useSearchQuery();

  const handleOpenMedia = (media_src?: string) => {
    nprogress.start();

    const mediaSrc = media_src ? `&media_src=${media_src}` : "";

    // Handle Private Search
    if (privateSearch) {
      return navigate(`/search?tab=${selectedMedia}${mediaSrc}`);
    }

    navigate(
      `/search?q=${encodeURIComponent(q)}&tab=${selectedMedia}${mediaSrc}`
    );
  };

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length) mutate();
  }, []);

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
            if (!res) return;
            return res?.results.slice(0, 10).map((img, i) => (
              <Grid.Col span={1}>
                <Image
                  key={i}
                  className={classes.general_media_img}
                  h={150}
                  w="100%"
                  radius="xs"
                  src={img.thumbnail_src}
                  onClick={() => handleOpenMedia(img.thumbnail_src)}
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
            <Button
              variant="default"
              size="xs"
              onClick={() => handleOpenMedia()}
            >
              More {selectedMedia}
            </Button>
          </>
        }
      />
    </Stack>
  );
};

export default GeneralMedia;
