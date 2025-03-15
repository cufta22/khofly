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

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { getIconStyle } from "@utils/functions/iconStyle";
import NewTabSwitch from "./NewTabSwitch";
import type { Dispatch, SetStateAction } from "react";
import PrimaryColorSelect from "./PrimaryColorSelect/PrimaryColorSelect";

interface Props {
  setDisplayThemeEdit: Dispatch<SetStateAction<boolean>>;
}

const SettingsInterface: React.FC<Props> = ({ setDisplayThemeEdit }) => {
  const t = useTranslate();

  const theme = useMantineTheme();

  return (
    <Paper radius="md" withBorder>
      <Flex align="center" p="lg" mb={16}>
        <IconBrush size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.interface.title")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconLanguage style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.interface.select_lang")}
            </Text>
          </Flex>

          <LanguageSelect />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconPalette style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.interface.select_theme")}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <ActionIcon variant="subtle" onClick={() => setDisplayThemeEdit((prev) => !prev)}>
              <IconEdit style={getIconStyle(20)} />
            </ActionIcon>

            <ThemeSelect />
          </Flex>
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconColorPicker style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.interface.select_primary_color")}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <PrimaryColorSelect />
          </Flex>
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconSunMoon style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.interface.select_color")}
            </Text>
          </Flex>

          <ColorSchemeSwitch />
        </Flex>

        <Divider my="xs" w="100%" />

        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <IconExternalLink style={getIconStyle(20)} color={theme.colors.gray["5"]} />

            <Text size="md" fw={400}>
              {t("pages.settings.interface.toggle_open_in_new_tab")}
            </Text>
          </Flex>

          <NewTabSwitch />
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsInterface;
