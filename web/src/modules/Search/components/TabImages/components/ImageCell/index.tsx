import { Flex, Image, Text } from "@mantine/core";
import type { ISearXNGResultsImages } from "@ts/searxng.types";
import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { useInViewport } from "@mantine/hooks";

interface Props {
  rowData: ISearXNGResultsImages["results"][0];
  openImageInView: (img: ISearXNGResultsImages["results"][0]) => void;
}

const ImageCell: React.FC<Props> = ({ rowData, openImageInView }) => {
  const { thumbnail_src, img_src, resolution, parsed_url, title } = rowData;

  // Lazy load images
  const [visible, setVisible] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) setVisible(true);
  }, [inViewport]);

  if (!title) return null;

  return (
    <Flex
      className={classes.image_container}
      direction="column"
      onClick={() => openImageInView(rowData)}
      ref={ref}
    >
      <Flex className={classes.image_cell} direction="column" px={6}>
        {visible ? (
          <Image src={thumbnail_src || img_src} width={200} height={220} alt={title} />
        ) : (
          <Flex w={200} h={220} />
        )}
        <Text size="xs" className={classes.format_label}>
          {resolution}
        </Text>
      </Flex>

      <Text component="span" size="sm" c="white" mt={4} className={classes.title_text}>
        {title}
      </Text>

      {parsed_url && parsed_url.length > 2 ? (
        <Text size="xs" lineClamp={1} mt={30} className={classes.url_text}>
          {parsed_url[0]}://{parsed_url[1]}
        </Text>
      ) : null}
    </Flex>
  );
};

export default ImageCell;
