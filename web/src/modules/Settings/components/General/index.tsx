import { Button, Divider, Flex, Paper, Stack, Text, Tooltip, useMantineTheme } from "@mantine/core";

import {
  IconCursorText,
  IconExternalLink,
  IconFavicon,
  IconInfoCircle,
  IconLayoutCollage,
  IconMessageCode,
  IconPlayerPlay,
  IconRadar,
  IconSettings2,
  IconShield,
  IconSparkles,
} from "@tabler/icons-react";
import FaviconSwitch from "./FaviconSwitch";
import { getIconStyle } from "@utils/functions/iconStyle";
import AutocompleteSwitch from "./AutocompleteSwitch";
import classes from "./styles.module.scss";
import IASwitch from "./IASwitch";
import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import PrivateSearchSwitch from "./PrivateSearchSwitch";
import MediaSwitch from "./MediaSwitch";
import ShowEnginesSwitch from "./ShowEnginesSwitch";
import AISwitch from "./AISwitch";

const SettingsGeneral = () => {
  const t = useTranslate();

  const theme = useMantineTheme();

  return (
    <Paper radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16}>
        <IconSettings2 size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.general.title")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconFavicon style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_favicon")}
            </Text>

            <Tooltip label="This will ping DuckDuckGo's favicon service, a lot">
              <IconInfoCircle style={getIconStyle(20)} />
            </Tooltip>
          </Flex>

          <FaviconSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconCursorText style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_autocomplete")}
            </Text>
          </Flex>

          <AutocompleteSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconRadar style={getIconStyle(20)} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.show_engines")}
            </Text>
          </Flex>

          <ShowEnginesSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconLayoutCollage style={getIconStyle(20)} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.display_media")}
            </Text>
          </Flex>

          <MediaSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconMessageCode style={getIconStyle(20)} color={theme.colors.grape["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_ia")}
            </Text>
          </Flex>

          <IASwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconSparkles style={getIconStyle(20)} color={theme.colors.pink["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_ai_answers")}
            </Text>
          </Flex>

          <AISwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconShield style={getIconStyle(20)} color={theme.colors.green["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_private_search")}
            </Text>
          </Flex>

          <PrivateSearchSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconPlayerPlay style={getIconStyle(20)} color={theme.colors.orange["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_private_search")}
            </Text>
          </Flex>

          <PrivateSearchSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Text size="md" fw={400}>
            {t("pages.settings.general.set_as_default")}
          </Text>

          <RemixLink to="/docs/set-default">
            <Button variant="outline">{t("pages.settings.general.set_as_default_btn")}</Button>
          </RemixLink>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsGeneral;
