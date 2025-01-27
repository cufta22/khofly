import { Anchor, Flex, Image, Text } from "@mantine/core";
import { ISearXNGResultsVideos } from "@ts/searxng.types";
import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { useResponsive } from "@hooks/use-responsive";
import { useSettingsStore } from "@store/settings";
import { useInViewport } from "@mantine/hooks";

interface Props {
  videoData: ISearXNGResultsVideos["results"][0];
}

const VideoCell: React.FC<Props> = ({ videoData }) => {
  const { parsed_url, title, thumbnail, url } = videoData;

  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const isXs = useResponsive("max", "xs");

  // Lazy load images
  const [visible, setVisible] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) setVisible(true);
  }, [inViewport]);

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs ? "_blank" : openInNewTab ? "_blank" : "_self";

  return (
    <Anchor href={url} target={anchorTarget} rel="noreferrer noopener">
      <Flex ref={ref} className={classes.video_container} direction="column" p="xs">
        {visible ? (
          <Image
            src={thumbnail}
            w="100%"
            h="auto"
            alt={title}
            fit="cover"
            radius="md"
            // unoptimized
          />
        ) : (
          <Flex w="100%" h={100} />
        )}

        <Text component="span" size="sm" c="white" lineClamp={2} mt={4}>
          {title}
        </Text>

        <Text size="xs" lineClamp={1} mt="xs">
          {parsed_url[0]}://{parsed_url[1]}
        </Text>
      </Flex>
    </Anchor>
  );
};

export default VideoCell;
