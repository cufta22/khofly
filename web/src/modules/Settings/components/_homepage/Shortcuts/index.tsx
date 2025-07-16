import { Divider, Flex, LoadingOverlay, Paper, Stack, Text, useMantineTheme } from "@mantine/core";

import { IconDeviceDesktop, IconExternalLink } from "@tabler/icons-react";

import { useTranslate } from "@hooks/translate/use-translate";
import ShortcutsSwitch from "./components/ShortcutsSwitch";
import Shortcut from "@module/Index/components/Shortcuts/components/Shortcut";
import ShortcutNew from "./components/ShortcutNew";
import { useHomepageStore } from "@store/homepage";
import SettingsTitle from "../../common/SettingsTitle";
import SettingsRow from "../../common/SettingsRow";
import { IOpenSection } from "@module/SettingsMobile";
import SettingsMTitle from "@module/SettingsMobile/components/common/SettingsTitle";
import ShortcutGroup from "@module/Index/components/Shortcuts/components/ShortcutGroup";
import ShortcutsNewTabSwitch from "./components/ShortcutNewTabSwitch";

interface Props {
  isM?: boolean;
  handleChangeSection?: (next: IOpenSection) => void;
}

const SettingsShortcuts: React.FC<Props> = ({ isM, handleChangeSection }) => {
  const theme = useMantineTheme();

  const t = useTranslate();

  const hydrated = useHomepageStore((state) => state.hydrated);
  const shortcuts = useHomepageStore((state) => state.shortcuts);

  const items = shortcuts.map((sc, i) => {
    return sc.type === "item" ? (
      <Shortcut key={i} idx={i} {...sc} />
    ) : (
      <ShortcutGroup key={i} idx={i} {...sc} />
    );
  });

  return (
    <>
      {isM && handleChangeSection && (
        <SettingsMTitle
          title="pages.settings.homepage.title_shortcuts"
          handleChangeSection={handleChangeSection}
        />
      )}

      <Paper radius="md" withBorder>
        {!isM && (
          <SettingsTitle
            icon={<IconExternalLink color={theme.colors.blue["5"]} />}
            title="pages.settings.homepage.title_shortcuts"
            rightSection={
              <Flex className="desktop_only" align="center">
                <IconDeviceDesktop />

                <Text ml="sm">Desktop only</Text>
              </Flex>
            }
          />
        )}

        {/* Settings content */}
        <Stack w="100%" align="start" px="lg" mb="xl" mt={isM ? "xl" : 0}>
          <SettingsRow
            // icon={null}
            desc="pages.settings.homepage.toggle_shortcuts"
            control={<ShortcutsSwitch isM={isM} />}
          />

          <SettingsRow
            // icon={null}
            desc="pages.settings.homepage.toggle_open_in_new_tab"
            control={<ShortcutsNewTabSwitch isM={isM} />}
          />

          <Divider my="sm" w="100%" />

          <Flex w="100%" align="center" justify="flex-start" gap="lg" pos="relative">
            {items}
            <ShortcutNew />

            <LoadingOverlay visible={!hydrated} />
          </Flex>
        </Stack>
      </Paper>
    </>
  );
};

export default SettingsShortcuts;
