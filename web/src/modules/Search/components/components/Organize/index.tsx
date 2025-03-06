import { Alert, Button, Center, Drawer, Flex, ScrollArea, Text } from "@mantine/core";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import useSearchQuery from "@hooks/use-search-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Organize: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslate();

  const q = useSearchQuery();

  const { cache, mutate, ...extraConfig } = useSWRConfig();
  const cacheKeys = Array.from(cache.keys());

  const [availableDomains, setAvailableDomains] = useState([]);

  const generalData = cache.get(
    "/search?q=!ddg%20!br%20!wp%20cats&categories=general&pageno=1&safesearch=0"
  )?.data;

  console.log(cacheKeys);

  useEffect(() => {
    const findPageData = cacheKeys.find((key) => {
      const keyURL = new URL(`http://example.com${key}`);

      return keyURL.searchParams.get("q")?.includes(encodeURIComponent(q));
    });

    console.log(findPageData);

    //   // if()
  }, [cacheKeys]);

  return (
    <Drawer
      offset={8}
      size="lg"
      radius="md"
      opened={isOpen}
      onClose={onClose}
      title={
        <Flex align="center" gap="sm">
          <Text size="xl">Organize results</Text>
        </Flex>
      }
      position="right"
      padding="xl"
      closeButtonProps={{
        size: "lg",
      }}
      classNames={{
        header: classes.drawer_header,
        content: classes.drawer_root,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Alert
        variant="light"
        color="blue"
        title="Here you can prioritize some domains and remove others from future searches."
        icon={<IconInfoCircle />}
        mt="xl"
      />
      <Center my="xl">
        <RemixLink to="/settings">
          <Button variant="outline" rightSection={<IconChevronRight style={getIconStyle(18)} />}>
            Show more
          </Button>
        </RemixLink>
      </Center>
    </Drawer>
  );
};

export default Organize;
