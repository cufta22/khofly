import { DEFAULT_THEME, type MantineThemeOverride } from "@mantine/core";
import type { IAppTheme } from "@ts/global.types";
import { THEME_CATPPUCCIN } from "./themes/catppuccin";
import { THEME_MANTINE_OLD } from "./themes/mantine-old";
import { THEME_MANTINE_NEW } from "./themes/mantine-new";
import { THEME_TOKYO_NIGHT } from "./themes/tokyo-night";
import { THEME_ROSE_PINE } from "./themes/rose-pine";

export const getMantineTheme = (
  appTheme: IAppTheme,
  // colorScheme: MantineColorScheme
): MantineThemeOverride => {
  switch (appTheme) {
    // For custom in LS
    // LS won't work on the server so... trycatch
    case "Custom": {
      try {
        const customTheme =
          JSON.parse(localStorage.getItem("custom-theme-json") || "") || DEFAULT_THEME;
        return customTheme;
      } catch (error) {
        return DEFAULT_THEME;
      }
    }

    // Prebuilt themes
    case "Mantine-Old": {
      return THEME_MANTINE_OLD;
    }

    case "Mantine-New": {
      return THEME_MANTINE_NEW;
    }

    case "Catppuccin": {
      return THEME_CATPPUCCIN;
    }

    case "Rose-Pine":
      return THEME_ROSE_PINE;

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
