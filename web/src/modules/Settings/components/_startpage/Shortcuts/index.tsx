import { Button, Divider, Flex, LoadingOverlay, Paper, Stack, Text } from "@mantine/core";

import { IconApps, IconDevices, IconExternalLink } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";

import { useTranslate } from "@hooks/translate/use-translate";
import ShortcutsSwitch from "./components/ShortcutsSwitch";
import Shortcut from "@module/Index/components/Shortcuts/components/Shortcut";
import ShortcutNew from "./components/ShortcutNew";
import { useStatrpageStore } from "@store/startpage";
import SettingsTitle from "../../common/SettingsTitle";
import SettingsRow from "../../common/SettingsRow";

const SettingsShortcuts = () => {
  const t = useTranslate();

  const hydrated = useStatrpageStore((state) => state.hydrated);
  const shortcuts = useStatrpageStore((state) => state.shortcuts);

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle
        icon={<IconExternalLink />}
        title="pages.settings.startpage.title_shortcuts"
        rightSection={
          <Flex className="desktop_only" align="center">
            <IconDevices />

            <Text ml="sm">Desktop & Mobile</Text>
          </Flex>
        }
      />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <SettingsRow
          // icon={null}
          desc="pages.settings.startpage.toggle_shortcuts"
          control={<ShortcutsSwitch />}
        />

        <Divider my="sm" w="100%" />

        <Flex w="100%" align="center" justify="flex-start" gap="lg" pos="relative">
          {shortcuts.map((data, i) => (
            <Shortcut key={i} idx={i} {...data} />
          ))}
          <ShortcutNew />

          <LoadingOverlay visible={!hydrated} />
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsShortcuts;
