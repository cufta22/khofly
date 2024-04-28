import {
  Anchor,
  Button,
  Center,
  Flex,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsMusic } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import {
  IconCalendar,
  IconMusic,
  IconPlayerPlay,
  IconVinyl,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";

interface Props {
  openMusicInPlayer: (src: string) => void;
  musicData: ISearXNGResultsMusic["results"][0];
}

const MusicRow: React.FC<Props> = ({ musicData, openMusicInPlayer }) => {
  const {
    title,
    url,
    parsed_url,
    content,
    engines,
    publishedDate,
    img_src,
    iframe_src,
  } = musicData;

  const { visitedLinks, updateVisitedLinks } = useSearchStore((state) => ({
    visitedLinks: state.visitedLinks,
    updateVisitedLinks: state.updateVisitedLinks,
  }));
  const { openInNewTab, displayFavicon } = useSettingsStore((state) => ({
    openInNewTab: state.openInNewTab,
    displayFavicon: state.displayFavicon,
  }));

  const isXs = useResponsive("max", "xs");
  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? "_blank"
    : openInNewTab
    ? "_blank"
    : "_self";

  return (
    <Anchor
      href={url}
      target={anchorTarget}
      onClick={() => updateVisitedLinks(url)}
      onAuxClick={(e) => {
        if (e.button === 1) {
          // Middle mouse button has been clicked! Do what you will with it...
          updateVisitedLinks(url);
        }
      }}
      rel="noreferrer noopener"
    >
      <Flex className={classes.music_row} direction="column">
        {/* Website url */}
        <Flex align="center" gap="xs">
          {displayFavicon && (
            <Image
              w={16}
              h={16}
              src={`https://icons.duckduckgo.com/ip3/${parsed_url[1]}.ico`}
              alt=""
            />
          )}

          <Text size="xs" truncate="end">
            {parsed_url[0]}://{parsed_url[1]}
            {parsed_url[2]}
          </Text>
        </Flex>

        {/* Music title */}

        <Flex mt="sm" gap="md">
          {/* Music img */}
          {img_src ? (
            <Image className={classes.music_img} src={img_src} radius="md" />
          ) : (
            <Paper className={classes.music_img}>
              <Center h="100%">
                <IconVinyl style={getIconStyle(46)} />
              </Center>
            </Paper>
          )}

          {/* Music data */}
          <Flex className={classes.music_data} direction="column">
            <Text
              className={clsx(classes.text_title, {
                [classes.text_title_visited]: visitedLinks.includes(url),
              })}
              mb={4}
              truncate="end"
            >
              {title}
            </Text>

            {/* Description */}
            <Text size="sm" c="dimmed" truncate="end">
              {content}
            </Text>

            <Flex align="center" mt="xs" justify="space-between">
              {/* Date */}
              {
                <Flex align="center">
                  {publishedDate && (
                    <>
                      <IconCalendar style={getIconStyle(18)} />

                      <Text size="sm" ml={6}>
                        {dayjs(publishedDate).format("MMM D, YYYY")}
                      </Text>
                    </>
                  )}
                </Flex>
              }

              <Button
                variant="light"
                leftSection={<IconPlayerPlay style={getIconStyle(16)} />}
                size="xs"
                w={100}
                onClick={(e) => {
                  e.preventDefault();

                  openMusicInPlayer(iframe_src);
                }}
              >
                Play
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Text size="xs" c="dimmed" mt="xs" ta="right">
          {engines.join(", ")}
        </Text>
      </Flex>
    </Anchor>
  );
};

export default MusicRow;
