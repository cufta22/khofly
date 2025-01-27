import { MantineThemeOverride } from "@mantine/core";
import { IAppTheme } from "@ts/global.types";
import { THEME_CATPPUCCIN_MOCHA } from "./themes/catppuccin-mocha";
import { THEME_MANTINE_OLD } from "./themes/mantine-old";
import { THEME_MANTINE_NEW } from "./themes/mantine-new";

export const getMantineTheme = (
  appTheme: IAppTheme
  // colorScheme: MantineColorScheme
): MantineThemeOverride => {
  switch (appTheme) {
    case "Mantine-Old":
      return THEME_MANTINE_OLD;

    case "Mantine-New":
      return THEME_MANTINE_NEW;

    case "Catppuccin-Mocha":
      return THEME_CATPPUCCIN_MOCHA;

    // case "Rose-Pine":
    //   return THEME_ROSE_PINE;

    // case "Tokyo-Night": {
    //   return THEME_TOKYO_NIGHT;
    // }

    // case "Nord": {
    //   return THEME_NORD;
    // }

    default:
      return THEME_MANTINE_OLD;
  }
};
