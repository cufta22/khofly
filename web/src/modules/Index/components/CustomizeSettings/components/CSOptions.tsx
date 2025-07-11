import { Flex, Space, Text } from "@mantine/core";
import ShortcutsSwitch from "@module/Settings/components/_homepage/Shortcuts/components/ShortcutsSwitch";
import SurpriseMeSwitch from "@module/Settings/components/_homepage/SurpriseMe!/components/SurpriseMeSwitch";
import SettingsRow from "@module/Settings/components/common/SettingsRow";

const CSOptions = () => {
  return (
    <>
      <Flex mt="xl" mb="md" align="center" justify="space-between">
        <Text size="xl">Shortcuts</Text>
      </Flex>

      <SettingsRow desc="pages.settings.homepage.toggle_shortcuts" control={<ShortcutsSwitch />} />

      <Space h={10} />

      <SettingsRow desc="pages.settings.homepage.toggle_surprise" control={<SurpriseMeSwitch />} />
    </>
  );
};

export default CSOptions;
