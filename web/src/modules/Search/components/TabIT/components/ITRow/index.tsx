import { Flex, Image, Space, Table, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsIT } from "@ts/searxng.types";
import clsx from "clsx";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePrimaryColor } from "@hooks/use-primary-color";

dayjs.extend(relativeTime);

interface Props {
  data: ISearXNGResultsIT["results"][0];
}

const ITRow: React.FC<Props> = ({ data }) => {
  const {
    title,
    url,
    parsed_url,
    content,
    engines,
    engine,

    homepage,
    license_name,
    img_src,
    license_url,
    maintainer,
    package_name,
    popularity,
    source_code_url,
    tags,
    version,
    publishedDate,
  } = data;

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const showEngines = useSettingsStore((state) => state.showEngines);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={classes.it_row} direction="column">
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

      <Table withRowBorders={false} verticalSpacing={2} mt="sm">
        {/* <Table.Thead></Table.Thead> */}
        <Table.Tbody>
          {package_name && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Name:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{package_name}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {version && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Version:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{version}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {maintainer && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Maintainer:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{maintainer}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {publishedDate && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Updated at:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{dayjs(publishedDate).format("MMM D, YYYY")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {tags && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Tags:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{tags.join(", ")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {!!popularity && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Popularity:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{popularity}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {license_name && license_url && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Licence:</Text>
              </Table.Td>
              <Table.Td>
                <SearchAnchor url={license_url}>
                  <Text c={linkTextColor} size="xs">
                    {license_name}
                  </Text>
                </SearchAnchor>
              </Table.Td>
            </Table.Tr>
          )}

          {homepage && source_code_url && (
            <Table.Tr>
              <Table.Td w={100}>
                <Text size="xs">Project:</Text>
              </Table.Td>
              <Table.Td>
                <Flex align="center" gap="xs">
                  <SearchAnchor url={homepage}>
                    <Text c={linkTextColor} size="xs">
                      Project homepage
                    </Text>
                  </SearchAnchor>
                  <Text size="xs">|</Text>
                  <SearchAnchor url={source_code_url}>
                    <Text c={linkTextColor} size="xs">
                      Project source code
                    </Text>
                  </SearchAnchor>
                </Flex>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

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
