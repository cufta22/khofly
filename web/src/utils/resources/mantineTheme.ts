import { DEFAULT_THEME, type MantineThemeOverride } from "@mantine/core";
import type { IAppTheme } from "@ts/global.types";
import { THEME_CATPPUCCIN_MOCHA } from "./themes/catppuccin-mocha";
import { THEME_MANTINE_OLD } from "./themes/mantine-old";
import { THEME_MANTINE_NEW } from "./themes/mantine-new";
import { THEME_TOKYO_NIGHT } from "./themes/tokyo-night";

export const getMantineTheme = (
  appTheme: IAppTheme,
  // colorScheme: MantineColorScheme
): MantineThemeOverride => {
  switch (appTheme) {
    // For custom in LS
    case "Custom": {
      const customTheme =
        JSON.parse(localStorage.getItem("custom-theme-json") || "") || DEFAULT_THEME;

      return customTheme;
    }

    // Prebuilt themes
    case "Mantine-Old": {
      return THEME_MANTINE_OLD;
    }

    case "Mantine-New": {
      return THEME_MANTINE_NEW;
    }

    case "Catppuccin-Mocha": {
      return THEME_CATPPUCCIN_MOCHA;
    }

    // case "Rose-Pine":
    //   return THEME_ROSE_PINE;

    case "Tokyo-Night": {
      return THEME_TOKYO_NIGHT;
    }

    // case "Nord": {
    //   return THEME_NORD;
    // }

    default:
      return THEME_MANTINE_OLD;
  }
};
