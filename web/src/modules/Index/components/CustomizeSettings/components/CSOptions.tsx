import { Flex, Space, Text, useMantineTheme } from "@mantine/core";
import ShortcutsSwitch from "@module/Settings/components/_homepage/Shortcuts/components/ShortcutsSwitch";
import SurpriseMeSwitch from "@module/Settings/components/_homepage/SurpriseMe!/components/SurpriseMeSwitch";
import SettingsRow from "@module/Settings/components/common/SettingsRow";
import { IconConfetti, IconExternalLink, IconSnowflake } from "@tabler/icons-react";

const CSOptions = () => {
  const theme = useMantineTheme();

  return (
    <>
      <Flex mt="xl" mb="md" align="center" justify="space-between">
        <Text size="xl">More options</Text>
      </Flex>

      <SettingsRow
        icon={<IconExternalLink color={theme.colors.blue["5"]} />}
        desc="pages.settings.homepage.toggle_shortcuts"
        control={<ShortcutsSwitch />}
      />

      <Space h={10} />

      <SettingsRow
        icon={<IconConfetti color={theme.colors.pink["5"]} />}
        desc="pages.settings.homepage.toggle_surprise"
        control={<SurpriseMeSwitch />}
      />

      {/* <Space h={10} />

      <SettingsRow
        icon={<IconSnowflake color={theme.colors.blue["3"]} />}
        desc="pages.settings.homepage.toggle_snow"
        control={<ShortcutsSwitch />}
      /> */}
    </>
  );
};

export default CSOptions;
