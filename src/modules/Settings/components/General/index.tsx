import {
  Button,
  Divider,
  Flex,
  Paper,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

import {
  IconCursorText,
  IconExternalLink,
  IconFavicon,
  IconInfoCircle,
  IconMessageCode,
  IconSettings2,
  IconShield,
} from "@tabler/icons-react";
import FaviconSwitch from "./FaviconSwitch";
import { getIconStyle } from "@utils/functions/iconStyle";
import AutocompleteSwitch from "./AutocompleteSwitch";
import NewTabSwitch from "./NewTabSwitch";
import classes from "./styles.module.scss";
import IASwitch from "./IASwitch";
import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import PrivateSearchSwitch from "./PrivateSearchSwitch";

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
            <IconFavicon
              style={getIconStyle(20)}
              color={theme.colors.gray["5"]}
            />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_favicon")}
            </Text>

            <Tooltip label="This will ping DuckDuckGo's favicon service, a lot">
              <IconInfoCircle style={getIconStyle(20)} />
            </Tooltip>
          </Flex>

          <FaviconSwitch />
        </Flex>

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconCursorText
              style={getIconStyle(20)}
              color={theme.colors.gray["5"]}
            />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_autocomplete")}
            </Text>
          </Flex>

          <AutocompleteSwitch />
        </Flex>

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconExternalLink
              style={getIconStyle(20)}
              color={theme.colors.gray["5"]}
            />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_open_in_new_tab")}
            </Text>
          </Flex>

          <NewTabSwitch />
        </Flex>

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconMessageCode
              style={getIconStyle(20)}
              color={theme.colors.grape["5"]}
            />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_ia")}
            </Text>
          </Flex>

          <IASwitch />
        </Flex>

        {/* <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Text size="md" fw={400}>
            WIP: Show engines for each search result
          </Text>

          <IASwitch />
        </Flex>

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Text size="md" fw={400}>
            WIP: display images in general search
          </Text>

          <IASwitch />
        </Flex> */}

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconShield
              style={getIconStyle(20)}
              color={theme.colors.green["5"]}
            />

            <Text size="md" fw={400}>
              {t("pages.settings.general.toggle_private_search")}
            </Text>
          </Flex>

          <PrivateSearchSwitch />
        </Flex>

        <Divider my="sm" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Text size="md" fw={400}>
            {t("pages.settings.general.set_as_default")}
          </Text>

          <RemixLink to="/docs/set-default">
            <Button variant="outline">
              {t("pages.settings.general.set_as_default_btn")}
            </Button>
          </RemixLink>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsGeneral;
