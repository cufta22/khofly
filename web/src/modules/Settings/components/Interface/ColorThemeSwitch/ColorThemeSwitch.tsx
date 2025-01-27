import { useTranslate } from "@hooks/translate/use-translate";
import {
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";

import { IconSun, IconMoon } from "@tabler/icons-react";

const ColorSchemeSwitch = () => {
  const t = useTranslate();
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  return (
    <Group align="center">
      <SegmentedControl
        value={computedColorScheme}
        onChange={(value) => setColorScheme(value as "light" | "dark")}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size={20} color={theme.colors.yellow[6]} />
                <Box ml={10}>
                  {t("pages.settings.interface.select_color_options.light")}
                </Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size={20} color={theme.colors.gray[4]} />
                <Box ml={10}>
                  {t("pages.settings.interface.select_color_options.dark")}
                </Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default ColorSchemeSwitch;
