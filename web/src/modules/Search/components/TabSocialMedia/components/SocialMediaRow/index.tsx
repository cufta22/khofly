import { Flex, Image, Space, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsSocialMedia } from "@ts/searxng.types";
import clsx from "clsx";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";

interface Props {
  data: ISearXNGResultsSocialMedia["results"][0];
}

const SocialMediaRow: React.FC<Props> = ({ data }) => {
  const { title, url, parsed_url, content, engines } = data;

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const showEngines = useSettingsStore((state) => state.showEngines);
  const displayFavicon = useSettingsStore((state) => state.displayFavicon);

  return (
    <Flex className={classes.social_media_row} direction="column">
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

export default SocialMediaRow;
