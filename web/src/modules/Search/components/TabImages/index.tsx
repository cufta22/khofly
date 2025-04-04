import { Button, Center, Flex, Text } from "@mantine/core";
import type { ISearXNGResultsImages } from "@ts/searxng.types";
import { useEffect, useState } from "react";
import useSearXNGSWR from "src/api/searxng/use-searxng-query";
import ImageCell from "./components/ImageCell";
import classes from "./styles.module.scss";
import ImageSkeleton from "./components/ImageSkeleton";
import { useDisclosure } from "@mantine/hooks";
import ImageView from "./components/ImageView";
import SearchOptions from "../components/SearchOptions";
import { useEnginesStore } from "@store/engines";
import { useSearchParams } from "react-router";

const TabImages = () => {
  const hydrated = useEnginesStore((state) => state.hydrated);

  const { data, error, isLoading, isValidating, mutate, setSize, size } =
    useSearXNGSWR<ISearXNGResultsImages>();

  const [isOpenImageView, { open: openImageView, close: closeImageView }] = useDisclosure(false);
  const [viewImage, setViewImage] = useState<ISearXNGResultsImages["results"][0] | null>(null);

  const [searchParams] = useSearchParams();

  const openImageInView = (img: ISearXNGResultsImages["results"][0]) => {
    setViewImage(img);
    openImageView();
  };

  useEffect(() => {
    // Don't fetch if previous data already exists to not spam the instance
    if (!data?.length && hydrated) mutate();
  }, [hydrated]);

  const paramsMediaSrc = searchParams.get("media_src");
  useEffect(() => {
    const foundImg = data?.[0].results.find((res) => res.img_src === paramsMediaSrc);

    // Open image initially if media_src param exists
    if (foundImg && paramsMediaSrc) {
      openImageInView(foundImg);
    }
  }, [paramsMediaSrc, data]);

  const isRateLimit = data?.includes("Too Many Requests" as any);

  return (
    <Flex className={classes.tab_images} direction="column">
      {/* Search Options */}
      <SearchOptions className={classes.search_options_images} />

      {error && (
        // Error state
        <Text>RIP images</Text>
      )}

      <Flex className={classes.image_gallery} wrap="wrap" p="lg" gap="md" justify="center">
        {data?.map((res) => {
          if (!res) return;
          return res?.results.map((img, i) => (
            <ImageCell key={i} rowData={img} openImageInView={openImageInView} />
          ));
        })}

        {(isLoading || isValidating || !hydrated) &&
          // Loading state
          Array.from(Array(30).keys()).map((e, i) => <ImageSkeleton key={i} />)}
      </Flex>

      {!isLoading &&
        data &&
        data?.length >= 1 &&
        data?.[0]?.results?.length >= 1 &&
        !isRateLimit && (
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

      <ImageView isOpen={isOpenImageView} handleClose={closeImageView} viewImage={viewImage} />
    </Flex>
  );
};

export default TabImages;
