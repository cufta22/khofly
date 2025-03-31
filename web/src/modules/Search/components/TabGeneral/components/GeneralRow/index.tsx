import { Flex, Image, Space, Text, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import type { ISearXNGResultsGeneral } from "@ts/searxng.types";
import clsx from "clsx";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";
import { IconLabelImportant } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { removeSubdomain } from "@module/Search/components/components/Organize/components/utils";

interface Props {
  rowData: ISearXNGResultsGeneral["results"][0];
}

const GeneralRow: React.FC<Props> = ({ rowData }) => {
  const { title, url, parsed_url, content, engines } = rowData;

  const theme = useMantineTheme();

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const showEngines = useSettingsStore((state) => state.showEngines);
  const displayFavicon = useSettingsStore((state) => state.displayFavicon);

  const domainsPriority = useSearchStore((state) => state.domainsPriority);

  const isPriority = domainsPriority.find((item) => item === removeSubdomain(parsed_url?.[1]));

  return (
    <Flex className={classes.search_row} direction="column">
      <SearchAnchor url={url}>
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

          <div style={{ flex: 1 }} />

          {isPriority && (
            <IconLabelImportant style={getIconStyle(24)} color={theme.colors.green["6"]} />
          )}
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

export default GeneralRow;
