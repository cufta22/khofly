import { Flex, Image, Space, Text } from "@mantine/core";
import classes from "./styles.module.scss";
import type { ISearXNGResultsNews } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconClock } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";
import { useFaviconAPI } from "src/api/favicon";

dayjs.extend(relativeTime);

interface Props {
  rowData: ISearXNGResultsNews["results"][0];
}

const NewsRow: React.FC<Props> = ({ rowData }) => {
  const { title, url, parsed_url, content, engines, publishedDate } = rowData;

  const { displayFavicon, getFaviconUrl } = useFaviconAPI();

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const showEngines = useSettingsStore((state) => state.showEngines);

  return (
    <Flex className={classes.news_row} direction="column">
      <SearchAnchor url={url}>
        {/* Website url */}
        <Flex align="center" gap="xs">
          {displayFavicon && <Image w={16} h={16} src={getFaviconUrl(parsed_url[1])} alt="" />}

          <Text size="xs" truncate="end">
            {parsed_url[0]}://{parsed_url[1]}
            {parsed_url[2]}
          </Text>
        </Flex>

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
      </SearchAnchor>

      {/* Date */}
      <Flex align="center" mb={4}>
        <IconClock style={getIconStyle(18)} />

        <Text size="sm" ml={6}>
          {dayjs(publishedDate).fromNow()}
        </Text>
      </Flex>

      {/* Website description */}
      <Text size="sm" c="dimmed">
        {content}
      </Text>

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

export default NewsRow;
