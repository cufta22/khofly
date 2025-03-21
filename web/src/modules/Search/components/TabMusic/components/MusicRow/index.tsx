import { Anchor, Button, Center, Flex, Image, Paper, Space, Text, Transition } from "@mantine/core";
import { type Dispatch, type SetStateAction, useState } from "react";
import classes from "./styles.module.scss";
import type { ISearXNGResultsMusic } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import { IconCalendar, IconVinyl } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";
import { useResponsive } from "@hooks/use-responsive";

interface Props {
  musicData: ISearXNGResultsMusic["results"][0];
  setPrivatePlayerData: Dispatch<SetStateAction<ISearXNGResultsMusic["results"][0] | null>>;
}

const MusicRow: React.FC<Props> = ({ musicData, setPrivatePlayerData }) => {
  const {
    title,
    url,
    parsed_url,
    content,
    engines,
    publishedDate,
    img_src,
    thumbnail,
    iframe_src,
  } = musicData;

  const [iframeOpen, setIframeOpen] = useState(false);

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);

  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const showEngines = useSettingsStore((state) => state.showEngines);

  const isXs = useResponsive("max", "xs");

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? "_blank"
    : openInNewTab
    ? "_blank"
    : "_self";

  return (
    <Flex
      className={clsx(classes.music_row, {
        [classes.music_row_playing]: iframeOpen,
      })}
      direction="column"
    >
      <Anchor
        href={url}
        target={anchorTarget}
        rel="noreferrer noopener"
        onClick={(e) => {
          if (privatePlayer && url.includes("youtube.com")) {
            e.preventDefault();
            setPrivatePlayerData(musicData);
          }
        }}
      >
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
      </Anchor>

      <Flex mt="sm" gap="md">
        {/* Music img */}
        <Anchor
          href={url}
          target={anchorTarget}
          rel="noreferrer noopener"
          onClick={(e) => {
            if (privatePlayer && url.includes("youtube.com")) {
              e.preventDefault();
              setPrivatePlayerData(musicData);
            }
          }}
        >
          {img_src || thumbnail ? (
            <Image className={classes.music_img} src={img_src || thumbnail} radius="md" />
          ) : (
            <Paper className={classes.music_img}>
              <Center h="100%">
                <IconVinyl style={getIconStyle(26)} />
              </Center>
            </Paper>
          )}
        </Anchor>

        {/* Content */}
        <Flex className={classes.music_data} direction="column">
          {/* Music title */}
          <Anchor
            href={url}
            target={anchorTarget}
            rel="noreferrer noopener"
            onClick={(e) => {
              if (privatePlayer && url.includes("youtube.com")) {
                e.preventDefault();
                setPrivatePlayerData(musicData);
              }
            }}
          >
            <Text
              className={clsx(classes.text_title, {
                [classes.text_title_visited]: visitedLinks.includes(url),
              })}
              mb={4}
              truncate="end"
            >
              {title}
            </Text>
          </Anchor>

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

      <Transition
        mounted={iframeOpen}
        transition={"scale-y"}
        duration={200}
        timingFunction="ease"
        keepMounted={false}
      >
        {(transitionStyle) => (
          <iframe
            style={{ ...transitionStyle, zIndex: 1 }}
            width="100%"
            src={iframe_src}
            title={title}
          />
        )}
      </Transition>
    </Flex>
  );
};

export default MusicRow;
