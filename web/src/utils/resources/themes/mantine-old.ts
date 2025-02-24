import type { MantineThemeOverride } from "@mantine/core";

export const THEME_MANTINE_OLD: MantineThemeOverride = {
  /** Put your mantine theme override here */
  // fontFamily: `var(--next-inter), sans-serif`,
  fontFamily: `'Inter', sans-serif`,
  cursorType: "pointer",

  // black: "#000", // Text color for light color scheme
  // white: "#fff", // Background color for some elements

  // Colors for old Mantine theme
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
};
