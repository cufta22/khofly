import { Accordion, Divider, Flex, Stack, Text } from "@mantine/core";
import { IconBrush } from "@tabler/icons-react";
import { useTranslate } from "@hooks/translate/use-translate";
import classes from "../styles.module.scss";

import LanguageSelect from "@module/Settings/components/_interface/Interface/LanguageSelect/LanguageSelect";
import ThemeSelect from "@module/Settings/components/_interface/Interface/ThemeSelect/ThemeSelect";
import ColorSchemeSwitch from "@module/Settings/components/_interface/Interface/ColorThemeSwitch/ColorThemeSwitch";
import NewTabSwitch from "@module/Settings/components/_interface/Interface/NewTabSwitch";

const QSInterface = () => {
  const t = useTranslate();

  return (
    <Accordion.Item className={classes.acc_item} value="interface">
      <Accordion.Control className={classes.acc_control} icon={<IconBrush />}>
        <Text size="lg">{t("pages.settings.interface.title")}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack mt="lg">
          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.interface.select_lang")}</Text>

            <LanguageSelect />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.interface.select_theme")}</Text>

            <ThemeSelect />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.interface.select_color")}</Text>

            <ColorSchemeSwitch />
          </Flex>

          <Divider my={6} w="100%" />

          <Flex align="center" justify="space-between">
            <Text>{t("pages.settings.interface.toggle_open_in_new_tab")}</Text>

            <NewTabSwitch />
          </Flex>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default QSInterface;
