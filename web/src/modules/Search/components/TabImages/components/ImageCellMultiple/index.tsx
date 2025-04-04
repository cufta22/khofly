import { Flex, Image, Text } from "@mantine/core";
import type { ISearXNGResultsImages } from "@ts/searxng.types";
import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { useInViewport } from "@mantine/hooks";

interface Props {
  rowData: ISearXNGResultsImages["results"][0];
  openImageInView: (img: ISearXNGResultsImages["results"][0]) => void;
}

const ImageCellMultiple: React.FC<Props> = ({ rowData, openImageInView }) => {
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
      className={classes.image_container_multiple}
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
    </Flex>
  );
};

export default ImageCellMultiple;
