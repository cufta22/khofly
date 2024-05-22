import { Accordion, Divider, Flex, Stack, Text } from "@mantine/core";
import { IconSettings2 } from "@tabler/icons-react";
import { useTranslate } from "@hooks/translate/use-translate";
import classes from "../styles.module.scss";

import FaviconSwitch from "@module/Settings/components/General/FaviconSwitch";
import ShowEnginesSwitch from "@module/Settings/components/General/ShowEnginesSwitch";
import MediaSwitch from "@module/Settings/components/General/MediaSwitch";
import IASwitch from "@module/Settings/components/General/IASwitch";
import PrivateSearchSwitch from "@module/Settings/components/General/PrivateSearchSwitch";

const QSGeneral = () => {
  const t = useTranslate();
  return (
    <Accordion.Item className={classes.acc_item} value="general">
      <Accordion.Control
        className={classes.acc_control}
        icon={<IconSettings2 />}
      >
        <Text size="lg">{t("pages.settings.general.title")}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack mt="lg">
          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.general.toggle_favicon")}</Text>

            <FaviconSwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.general.show_engines")}</Text>

            <ShowEnginesSwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.general.display_media")}</Text>

            <MediaSwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.general.toggle_ia")}</Text>

            <IASwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.general.toggle_private_search")}</Text>

            <PrivateSearchSwitch />
          </Flex>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default QSGeneral;
