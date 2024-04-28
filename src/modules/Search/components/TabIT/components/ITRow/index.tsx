import { Anchor, Flex, Image, Table, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsIT } from "@ts/searxng.types";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconClock } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";

dayjs.extend(relativeTime);

const ITRow: React.FC<ISearXNGResultsIT["results"][0]> = ({
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
}) => {
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
    <Flex className={classes.it_row} direction="column">
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
      </Anchor>

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
                <Text size="xs">
                  {dayjs(publishedDate).format("MMM D, YYYY")}
                </Text>
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
                <Anchor href={license_url} target={anchorTarget}>
                  <Text c="blue" size="xs">
                    {license_name}
                  </Text>
                </Anchor>
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
                  <Anchor href={homepage} target={anchorTarget}>
                    <Text c="blue" size="xs">
                      Project homepage
                    </Text>
                  </Anchor>
                  <Text size="xs">|</Text>
                  <Anchor href={source_code_url} target={anchorTarget}>
                    <Text c="blue" size="xs">
                      Project source code
                    </Text>
                  </Anchor>
                </Flex>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Text size="xs" c="dimmed" ta="right">
        {engines.join(", ")}
      </Text>
    </Flex>
  );
};

export default ITRow;
