import { ActionIcon, Divider, Flex, Paper, Stack, Text, useMantineTheme } from "@mantine/core";

import LanguageSelect from "./LanguageSelect/LanguageSelect";
import ThemeSelect from "./ThemeSelect/ThemeSelect";
import ColorSchemeSwitch from "./ColorThemeSwitch/ColorThemeSwitch";

import {
  IconBrush,
  IconColorPicker,
  IconEdit,
  IconExternalLink,
  IconLanguage,
  IconPalette,
  IconSunMoon,
} from "@tabler/icons-react";

import { getIconStyle } from "@utils/functions/iconStyle";
import NewTabSwitch from "./NewTabSwitch";
import type { Dispatch, SetStateAction } from "react";
import PrimaryColorSelect from "./PrimaryColorSelect/PrimaryColorSelect";
import SettingsTitle from "../../common/SettingsTitle";
import SettingsRow from "../../common/SettingsRow";

import commonClasses from "../../common/styles.module.scss";

interface Props {
  setDisplayThemeEdit: Dispatch<SetStateAction<boolean>>;
}

const SettingsInterface: React.FC<Props> = ({ setDisplayThemeEdit }) => {
  const theme = useMantineTheme();

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle icon={<IconBrush />} title="pages.settings.interface.title" />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <SettingsRow
          icon={<IconLanguage color={theme.colors.gray["5"]} />}
          desc="pages.settings.interface.select_lang"
          control={<LanguageSelect />}
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconPalette color={theme.colors.gray["5"]} />}
          desc="pages.settings.interface.select_theme"
          control={
            <Flex className={commonClasses.settings_control} align="center" gap="sm">
              <ActionIcon variant="subtle" onClick={() => setDisplayThemeEdit((prev) => !prev)}>
                <IconEdit style={getIconStyle(20)} />
              </ActionIcon>

              <ThemeSelect />
            </Flex>
          }
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconColorPicker color={theme.colors.gray["5"]} />}
          desc="pages.settings.interface.select_primary_color"
          control={<PrimaryColorSelect />}
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconSunMoon color={theme.colors.gray["5"]} />}
          desc="pages.settings.interface.select_color"
          control={<ColorSchemeSwitch />}
        />

        <Divider my="xs" w="100%" />

        <SettingsRow
          icon={<IconExternalLink color={theme.colors.gray["5"]} />}
          desc="pages.settings.interface.toggle_open_in_new_tab"
          control={<NewTabSwitch />}
        />
      </Stack>
    </Paper>
  );
};

export default SettingsInterface;
