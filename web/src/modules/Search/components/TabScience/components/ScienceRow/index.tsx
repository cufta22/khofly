import { Button, Flex, Image, Space, Spoiler, Table, Text } from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import { ISearXNGResultsScience } from "@ts/searxng.types";
import clsx from "clsx";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import SearchAnchor from "@module/Search/components/components/SearchAnchor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePrimaryColor } from "@hooks/use-primary-color";

dayjs.extend(relativeTime);

interface Props {
  data: ISearXNGResultsScience["results"][0];
}

const ScienceRow: React.FC<Props> = ({ data }) => {
  const {
    title,
    url,
    parsed_url,
    content,
    engines,
    publishedDate,
    doi,
    tags,
    authors,
    pdf_url,
    journal,
    publisher,
    type,
    isbn,
    issn,
  } = data;

  const visitedLinks = useSearchStore((state) => state.visitedLinks);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const showEngines = useSettingsStore((state) => state.showEngines);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={classes.science_row} direction="column">
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
          truncate="end"
        >
          {title}
        </Text>
      </SearchAnchor>

      {/* Article data */}
      <Table withRowBorders={false} verticalSpacing={2} mt="sm">
        {/* <Table.Thead></Table.Thead> */}
        <Table.Tbody>
          {publishedDate && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Published date:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{dayjs(publishedDate).format("MMM D, YYYY")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {authors && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Author:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{authors.filter((a) => a !== "…").join(", ")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {journal && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Journal:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{journal}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {publisher && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Publisher:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{publisher}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {type && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Type:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{type}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {tags && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">Tags:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{tags.join(", ")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {doi && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">DOI:</Text>
              </Table.Td>
              <Table.Td>
                <SearchAnchor url={`https://oadoi.org/${doi}`}>
                  <Text c={linkTextColor} size="xs">
                    {doi}
                  </Text>
                </SearchAnchor>
              </Table.Td>
            </Table.Tr>
          )}

          {isbn && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">ISBN:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{isbn.join(", ")}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {issn && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size="xs">ISSN:</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs">{issn.join(", ")}</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {/* Website description */}
      <Spoiler maxHeight={90} showLabel="Show more" hideLabel="Hide">
        <Text mt="xs" size="sm" c="dimmed">
          {content}
        </Text>
      </Spoiler>

      {/* Links */}
      <Flex mt="xs" gap="sm">
        {pdf_url && (
          <SearchAnchor url={pdf_url}>
            <Button variant="default" size="xs">
              PDF
            </Button>
          </SearchAnchor>
        )}

        {doi && (
          <SearchAnchor url={`https://www.altmetric.com/details/doi/${doi}`}>
            <Button variant="default" size="xs">
              Altmetric
            </Button>
          </SearchAnchor>
        )}
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

export default ScienceRow;
