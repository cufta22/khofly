import { Anchor, Avatar, Flex, Image } from "@mantine/core";
import type { ISearXNGResultsVideos } from "@ts/searxng.types";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { useResponsive } from "@hooks/use-responsive";
import { useSettingsStore } from "@store/settings";
import { useInViewport } from "@mantine/hooks";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

interface Props {
  rowData: ISearXNGResultsVideos["results"][0];
  setPrivatePlayerURL: Dispatch<SetStateAction<string>>;
}

const VideoCellMultiple: React.FC<Props> = ({ rowData, setPrivatePlayerURL }) => {
  const { parsed_url, title, thumbnail, url } = rowData;

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);

  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const isXs = useResponsive("max", "xs");

  // Lazy load images
  const [visible, setVisible] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) setVisible(true);
  }, [inViewport]);

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? "_blank"
    : openInNewTab
    ? "_blank"
    : "_self";

  if (!title) return null;

  return (
    <Flex ref={ref} className={classes.video_container_multiple} direction="column" p="xs">
      <Anchor
        href={url}
        target={anchorTarget}
        rel="noreferrer noopener"
        onClick={(e) => {
          if (privatePlayer && url.includes("youtube.com")) {
            e.preventDefault();
            setPrivatePlayerURL(url);
          }
        }}
      >
        {visible ? (
          <>
            <Image
              src={thumbnail}
              w="100%"
              h="auto"
              alt={title}
              fit="cover"
              radius="md"
              // unoptimized
            />

            <Avatar className={classes.play_icon} variant="filled" color="dark.5">
              <IconPlayerPlayFilled />
            </Avatar>
          </>
        ) : (
          <Flex w="100%" h={100} />
        )}
      </Anchor>
    </Flex>
  );
};

export default VideoCellMultiple;
