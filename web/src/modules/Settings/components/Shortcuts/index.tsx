import { Button, Divider, Flex, LoadingOverlay, Paper, Stack, Text } from "@mantine/core";

import { IconApps } from "@tabler/icons-react";

import classes from "../../styles.module.scss";

import { useTranslate } from "@hooks/translate/use-translate";
import ShortcutsSwitch from "./components/ShortcutsSwitch";
import Shortcut from "@module/Index/components/Shortcuts/components/Shortcut";
import ShortcutNew from "./components/ShortcutNew";
import { useShortcutsStore } from "@store/shortcuts";

const SettingsShortcuts = () => {
  const t = useTranslate();

  const hydrated = useShortcutsStore((state) => state.hydrated);
  const shortcuts = useShortcutsStore((state) => state.shortcuts);

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconApps size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.shortcuts.title")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <Text size="md" fw={400}>
              {t("pages.settings.shortcuts.toggle_shortcuts")}
            </Text>
          </Flex>

          <ShortcutsSwitch />
        </Flex>

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
