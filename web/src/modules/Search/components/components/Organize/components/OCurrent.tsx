import { Accordion, SimpleGrid, Text } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import classes from "../styles.module.scss";
import useSearchQuery from "@hooks/use-search-query";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import type { ISearXNGResultsGeneral } from "@ts/searxng.types";
import DomainItem from "./DomainItem";
import { removeSubdomain } from "./utils";

const OCurrent = () => {
  const q = useSearchQuery();

  const { cache, mutate, ...extraConfig } = useSWRConfig();
  const cacheKeys = Array.from(cache.keys());

  const [currentDomains, setCurrentDomains] = useState<string[]>([]);

  useEffect(() => {
    if (currentDomains.length) return;

    const findPageDataKey = cacheKeys
      .filter((item) => item.startsWith("$inf$/search?q="))
      .find((key) => {
        const keyURL = new URL(`http://example.com${key}`);

        return keyURL.searchParams.get("q")?.includes(q);
      });

    if (!findPageDataKey) return;

    const pageData = cache.get(findPageDataKey)?.data?.[0]?.results;
    if (!pageData) return;

    const uniqueDomains: string[] = pageData.map((result: ISearXNGResultsGeneral["results"][0]) => {
      return removeSubdomain(result?.parsed_url?.[1]);
    });

    setCurrentDomains([...new Set(uniqueDomains)]);
  }, [q, cacheKeys]);

  return (
    <Accordion.Item className={classes.acc_item} value="current">
      <Accordion.Control className={classes.acc_control} icon={<IconLink />}>
        <Text size="lg">Current domains</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <SimpleGrid mt="lg" cols={2} spacing="md">
          {currentDomains.map((item) => (
            <DomainItem key={item} domain={item} isCurrent />
          ))}
        </SimpleGrid>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default OCurrent;
