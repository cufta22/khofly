import {
  Anchor,
  Button,
  DEFAULT_THEME,
  Flex,
  JsonInput,
  Paper,
  Stack,
  Text,
  useMantineTheme,
  createTheme,
} from "@mantine/core";

import {
  IconBrush,
  IconCheck,
  IconMinus,
  IconPalette,
  IconPlus,
} from "@tabler/icons-react";

import { useTranslate } from "@hooks/translate/use-translate";
import { useState } from "react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { THEME_MANTINE_OLD } from "@utils/resources/themes/mantine-old";
import { THEME_CATPPUCCIN_MOCHA } from "@utils/resources/themes/catppuccin-mocha";
import { useClientServerState } from "@store/client-server";

const SettingsThemeEditor = () => {
  const t = useTranslate();

  const [themeJson, setThemeJson] = useState("");

  const theme = useMantineTheme();

  const { setTheme } = useClientServerState();

  const handleApply = () => {
    // const isValid = validateMantineTheme(JSON.parse(themeJson));
    // console.log(validateMantineTheme(DEFAULT_THEME));
    const newTheme = createTheme(JSON.parse(themeJson));

    console.log(newTheme);

    // Set theme in LS
    localStorage.setItem("custom-theme-json", JSON.stringify(themeJson));

    // Set theme in zustand
    setTheme("Custom");

    // if (!isValid) {
    //   return;
    // }
  };

  return (
    <Paper radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16}>
        <IconPalette size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.theme.title")}
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" align="center">
          <Button
            leftSection={<IconPlus style={getIconStyle(16)} />}
            onClick={() => setThemeJson(JSON.stringify(DEFAULT_THEME, null, 4))}
            size="xs"
            variant="light"
            mr="md"
          >
            Full theme
          </Button>

          <Button
            leftSection={<IconPlus style={getIconStyle(16)} />}
            onClick={() => setThemeJson(JSON.stringify(THEME_CATPPUCCIN_MOCHA, null, 4))}
            size="xs"
            variant="light"
            mr="md"
          >
            Basic theme
          </Button>

          <Button
            leftSection={<IconMinus style={getIconStyle(16)} />}
            onClick={() => setThemeJson("")}
            size="xs"
            variant="light"
            mr="md"
          >
            Clear
          </Button>

          <Anchor href="https://mantine.dev/theming/theme-object/" target="_blank">
            Learn more
          </Anchor>

          <div style={{ flexGrow: 1 }}></div>

          <Button
            leftSection={<IconCheck style={getIconStyle(16)} />}
            onClick={() => handleApply()}
            size="xs"
            variant="filled"
          >
            Apply theme
          </Button>
        </Flex>

        <Text>Edit this only if you know what you're doing</Text>

        <JsonInput
          placeholder="{ ..."
          validationError="Invalid JSON"
          formatOnBlur
          w="100%"
          minRows={10}
          rows={20}
          value={themeJson}
          onChange={(val) => setThemeJson(val)}
        />
      </Stack>
    </Paper>
  );
};

export default SettingsThemeEditor;
