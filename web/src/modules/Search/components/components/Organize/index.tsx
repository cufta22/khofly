import { Accordion, Alert, Button, Center, Drawer, Flex, ScrollArea, Text } from "@mantine/core";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import useSearchQuery from "@hooks/use-search-query";
import OCurrent from "./components/OCurrent";
import OPriority from "./components/OPriority";
import OBlacklist from "./components/OBlacklist";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Organize: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslate();

  const [openAlert, { close }] = useDisclosure(true);

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
      {openAlert && (
        <Alert
          variant="light"
          color="blue"
          title="Here you can prioritize some domains and remove others from future searches."
          icon={<IconInfoCircle />}
          withCloseButton
          onClose={close}
          mt="xl"
        />
      )}

      <Accordion defaultValue={["current"]} multiple={true}>
        <OCurrent />

        <OPriority />

        <OBlacklist />
      </Accordion>
      {/* 
      <Center my="xl">
        <RemixLink to="/settings">
          <Button variant="outline" rightSection={<IconChevronRight style={getIconStyle(18)} />}>
            Show more
          </Button>
        </RemixLink>
      </Center> */}
    </Drawer>
  );
};

export default Organize;
