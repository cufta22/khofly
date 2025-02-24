import { useMantineTheme, type MantineColorShade } from "@mantine/core";

export const usePrimaryColor = (shade?: MantineColorShade) => {
  const theme = useMantineTheme();

  return theme.colors[theme.primaryColor][shade || 6];
};
