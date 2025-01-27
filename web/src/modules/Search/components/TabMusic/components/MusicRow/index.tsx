import { Anchor, Button, Center, Collapse, Flex, Image, Paper, Space, Text, Transition } from "@mantine/core";
import React, { useState } from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsMusic } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import { IconCalendar, IconMusic, IconPlayerPause, IconPlayerPlay, IconVinyl } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";

interface Props {
  musicData: ISearXNGResultsMusic["results"][0];
}

const MusicRow: React.FC<Props> = ({ musicData }) => {
  const { title, url, parsed_url, content, engines, publishedDate, img_src, iframe_src } = musicData;

  const [iframeOpen, setIframeOpen] = useState(false);

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const showEngines = useSettingsStore((state) => state.showEngines);

  return (
    <Flex
      className={clsx(classes.music_row, {
        [classes.music_row_playing]: iframeOpen,
      })}
      direction="column"
    >
      <SearchAnchor url={url}>
        {/* Website url */}
        <Flex align="center" gap="xs">
          {displayFavicon && (
            <Image w={16} h={16} src={`https://icons.duckduckgo.com/ip3/${parsed_url[1]}.ico`} alt="" />
          )}

          <Text size="xs" truncate="end">
            {parsed_url[0]}://{parsed_url[1]}
            {parsed_url[2]}
          </Text>
        </Flex>
      </SearchAnchor>

      <Flex mt="sm" gap="md">
        {/* Music img */}
        <SearchAnchor url={url}>
          {img_src ? (
            <Image className={classes.music_img} src={img_src} radius="md" />
          ) : (
            <Paper className={classes.music_img}>
              <Center h="100%">
                <IconVinyl style={getIconStyle(46)} />
              </Center>
            </Paper>
          )}
        </SearchAnchor>

        {/* Content */}
        <Flex className={classes.music_data} direction="column">
          {/* Music title */}
          <SearchAnchor url={url}>
            <Text
              className={clsx(classes.text_title, {
                [classes.text_title_visited]: visitedLinks.includes(url),
              })}
              mb={4}
              truncate="end"
            >
              {title}
            </Text>
          </SearchAnchor>

          {/* Description */}
          <Text size="sm" c="dimmed" truncate="end">
            {content}
          </Text>

          {/* Music data */}
          <Flex align="center" mt="xs" justify="space-between">
            {/* Date */}
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

            <Button
              variant="light"
              size="xs"
              w={100}
              onClick={(e) => {
                e.preventDefault();

                setIframeOpen((prev) => !prev);
              }}
            >
              {iframeOpen ? "Hide media" : "Show media"}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {showEngines ? (
        <Text size="xs" c="dimmed" mt="xs" ta="right">
          {showEngines ? engines.join(", ") : ""}
        </Text>
      ) : (
        <Space h={26.8} />
      )}

      <Transition mounted={iframeOpen} transition={"scale-y"} duration={200} timingFunction="ease" keepMounted={false}>
        {(transitionStyle) => <iframe style={{ ...transitionStyle, zIndex: 1 }} width="100%" src={iframe_src} />}
      </Transition>
    </Flex>
  );
};

export default MusicRow;
