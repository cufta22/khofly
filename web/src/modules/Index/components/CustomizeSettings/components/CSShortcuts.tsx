import { Flex, Text } from "@mantine/core";
import ShortcutsSwitch from "@module/Settings/components/_startpage/Shortcuts/components/ShortcutsSwitch";
import SettingsRow from "@module/Settings/components/common/SettingsRow";

const CSShortcuts = () => {
  return (
    <>
      <Flex mt="xl" mb="md" align="center" justify="space-between">
        <Text size="xl">Shortcuts</Text>
      </Flex>

      <SettingsRow desc="pages.settings.startpage.toggle_shortcuts" control={<ShortcutsSwitch />} />
    </>
  );
};

export default CSShortcuts;
