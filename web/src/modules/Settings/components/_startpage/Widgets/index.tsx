import { Divider, Flex, Paper, Stack, Text, useMantineTheme } from "@mantine/core";

import {
  IconApps,
  IconClock,
  IconDeviceDesktop,
  IconHaze,
  IconListCheck,
} from "@tabler/icons-react";

import classes from "../../../styles.module.scss";

import { useTranslate } from "@hooks/translate/use-translate";
import WeatherSwitch from "./components/WeatherSwitch";
import { getIconStyle } from "@utils/functions/iconStyle";
import ToDoSwitch from "./components/ToDoSwitch";
import ClockSwitch from "./components/ClockSwitch";
import PositionSelect from "./components/PositionSelect";

const SettingsWidgets = () => {
  const theme = useMantineTheme();
  const t = useTranslate();

  return (
    <Paper className="desktop_only" radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16}>
        <IconApps size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.startpage.title_widgets")}
        </Text>

        <div style={{ flex: 1 }} />

        <Flex className="desktop_only" align="center">
          <IconDeviceDesktop />

          <Text ml="sm">Desktop only</Text>
        </Flex>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        {/* Weather widget */}

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconHaze style={getIconStyle(24)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.startpage.toggle_weather")}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <PositionSelect type="weather" />

            <WeatherSwitch />
          </Flex>
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconListCheck style={getIconStyle(24)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.startpage.toggle_todos")}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <PositionSelect type="todos" />

            <ToDoSwitch />
          </Flex>
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconClock style={getIconStyle(24)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.startpage.toggle_clock")}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <PositionSelect type="clock" />

            <ClockSwitch />
          </Flex>
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsWidgets;
