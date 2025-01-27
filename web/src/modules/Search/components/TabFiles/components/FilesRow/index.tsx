import { Anchor, Button, Center, Flex, Image, Kbd, Paper, Space, Table, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsFiles } from "@ts/searxng.types";
import clsx from "clsx";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconCalendar, IconFile, IconMagnet } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";

dayjs.extend(relativeTime);

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};

interface Props {
  data: ISearXNGResultsFiles["results"][0];
}

const ITRow: React.FC<Props> = ({ data }) => {
  const {
    title,
    url,
    parsed_url,
    engines,
    img_src,

    filesize,
    seed,
    leech,
    magnetlink,
    publishedDate,
  } = data;

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const openInNewTab = useSettingsStore((state) => state.openInNewTab);
  const showEngines = useSettingsStore((state) => state.showEngines);

  const isXs = useResponsive("max", "xs");

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs ? "_blank" : openInNewTab ? "_blank" : "_self";

  return (
    <Flex className={classes.files_row} direction="column">
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
        {/* File img */}
        <SearchAnchor url={url}>
          {img_src ? (
            <Image className={classes.file_img} src={img_src} radius="md" />
          ) : (
            <Paper className={classes.file_img}>
              <Center h="100%">
                <IconFile style={getIconStyle(46)} />
              </Center>
            </Paper>
          )}
        </SearchAnchor>

        {/* Content */}
        <Flex className={classes.files_data} direction="column">
          {/* Website title */}
          <Text
            className={clsx(classes.text_title, {
              [classes.text_title_visited]: visitedLinks.includes(url),
            })}
            mb={4}
            truncate="end"
          >
            {title}
          </Text>

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

            {filesize && (
              <Text size="xs" ml="md">
                <Kbd>{formatBytes(filesize)}</Kbd>
              </Text>
            )}
          </Flex>

          <Flex align="center" mt="xs" justify="space-between">
            {seed && seed !== "N/A" && leech && leech !== "N/A" && (
              <Text size="xs" mt="xs">
                <Kbd>Seed {seed}</Kbd> • <Kbd>Leech {leech}</Kbd>
              </Text>
            )}

            {magnetlink && (
              <Anchor href={magnetlink} target={anchorTarget} rel="noreferrer noopener">
                <Button variant="light" size="xs" leftSection={<IconMagnet style={getIconStyle(18)} />}>
                  Magnet link
                </Button>
              </Anchor>
            )}
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
    </Flex>
  );
};

export default ITRow;
