import { Flex, Paper, Stack, Text } from "@mantine/core";

import { IconDeviceDesktop, IconHaze } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";

import { useTranslate } from "@hooks/translate/use-translate";
import WeatherSwitch from "./components/WeatherSwitch";

const SettingsWeather = () => {
  const t = useTranslate();

  return (
    <Paper radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16}>
        <IconHaze size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.startpage.title_weather")}
        </Text>

        <div style={{ flex: 1 }} />

        <Flex align="center">
          <IconDeviceDesktop />

          <Text ml="sm">Desktop only</Text>
        </Flex>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <Text size="md" fw={400}>
              {t("pages.settings.startpage.toggle_weather")}
            </Text>
          </Flex>

          <WeatherSwitch />
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsWeather;
