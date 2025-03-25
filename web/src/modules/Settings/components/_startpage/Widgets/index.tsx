import { Divider, Flex, Paper, Stack, Text, useMantineTheme } from "@mantine/core";

import {
  IconApps,
  IconClock,
  IconDeviceDesktop,
  IconHaze,
  IconListCheck,
  IconNote,
} from "@tabler/icons-react";

import WeatherSwitch from "./components/WeatherSwitch";
import { getIconStyle } from "@utils/functions/iconStyle";
import ToDoSwitch from "./components/ToDoSwitch";
import ClockSwitch from "./components/ClockSwitch";
import PositionSelect from "./components/PositionSelect";
import SettingsTitle from "../../common/SettingsTitle";
import SettingsRow from "../../common/SettingsRow";

import commonClasses from "../../common/styles.module.scss";
import NotesSwitch from "./components/NotesSwitch";

const SettingsWidgets = () => {
  const theme = useMantineTheme();

  return (
    <Paper className="desktop_only" radius="md" withBorder>
      <SettingsTitle
        icon={<IconApps />}
        title="pages.settings.startpage.title_widgets"
        rightSection={
          <Flex className="desktop_only" align="center">
            <IconDeviceDesktop />

            <Text ml="sm">Desktop only</Text>
          </Flex>
        }
      />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        {/* Weather widget */}
        <SettingsRow
          icon={<IconHaze style={getIconStyle(24)} color={theme.colors.gray["5"]} />}
          desc="pages.settings.startpage.toggle_weather"
          control={
            <Flex className={commonClasses.settings_control} align="center" gap="sm">
              <PositionSelect type="weather" />

              <WeatherSwitch />
            </Flex>
          }
        />

        <Divider my="xs" w="100%" />

        {/* To-Do widget */}
        <SettingsRow
          icon={<IconListCheck style={getIconStyle(24)} color={theme.colors.gray["5"]} />}
          desc="pages.settings.startpage.toggle_todos"
          control={
            <Flex className={commonClasses.settings_control} align="center" gap="sm">
              <PositionSelect type="todos" />

              <ToDoSwitch />
            </Flex>
          }
        />

        <Divider my="xs" w="100%" />

        {/* Notes widget */}
        <SettingsRow
          icon={<IconNote style={getIconStyle(24)} color={theme.colors.gray["5"]} />}
          desc="pages.settings.startpage.toggle_notes"
          control={
            <Flex className={commonClasses.settings_control} align="center" gap="sm">
              <PositionSelect type="notes" />

              <NotesSwitch />
            </Flex>
          }
        />

        <Divider my="xs" w="100%" />

        {/* Analog clock widget */}
        <SettingsRow
          icon={<IconClock style={getIconStyle(24)} color={theme.colors.gray["5"]} />}
          desc="pages.settings.startpage.toggle_clock"
          control={
            <Flex className={commonClasses.settings_control} align="center" gap="sm">
              <PositionSelect type="clock" />

              <ClockSwitch />
            </Flex>
          }
        />
      </Stack>
    </Paper>
  );
};

export default SettingsWidgets;
