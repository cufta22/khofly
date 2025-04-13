import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Input,
  type MantineThemeOverride,
  Modal,
  Paper,
  rgba,
  SegmentedControl,
  Switch,
  Tabs,
  Text,
  UnstyledButton,
} from "@mantine/core";

// Frutiger Aero Theme for Mantine
export const THEME_FRUTIGER_AERO: MantineThemeOverride = {
  /** Put your mantine theme override here */
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", // Fonts that were popular in that era

  cursorType: "pointer",
  autoContrast: true,

  black: "#12161D", // Text color on light color scheme
  white: "#E6F4FF", // Background color for some elements on light color scheme

  // Primary color for buttons, links, etc.
  primaryColor: "aeroBlue",
  primaryShade: 4, // Index in the color array (3399FF)

  // Set default radius to achieve the rounded corners of Frutiger Aero
  defaultRadius: "md",

  // Core colors
  colors: {
    // Main blue gradient palette - from light to dark
    aeroBlue: [
      "#E6F4FF", // Very light blue
      "#CCE9FF", // Light blue
      "#99D1FF", // Medium light blue
      "#66B8FF", // Medium blue
      "#3399FF", // Primary blue
      "#0077E6", // Medium dark blue
      "#0066CC", // Dark blue
      "#004C99", // Very dark blue
      "#003366", // Extra dark blue
      "#001A33", // Darkest blue
    ],
    // Accent colors for UI elements
    aeroAccent: [
      "#FFECCC", // Light orange
      "#FFDB99", // Medium light orange
      "#FFC966", // Medium orange
      "#FFB833", // Main orange
      "#FFA500", // Primary orange
      "#E69500", // Medium dark orange
      "#CC8400", // Dark orange
      "#B37300", // Very dark orange
      "#804C00", // Extra dark orange
      "#663D00", // Darkest orange
    ],

    // Other mantine colors
    blue: [
      "#E6F4FF", // Very light blue
      "#CCE9FF", // Light blue
      "#99D1FF", // Medium light blue
      "#66B8FF", // Medium blue
      "#3399FF", // Standard glossy blue - primary Frutiger Aero
      "#0077E6", // Medium dark blue
      "#0066CC", // Dark blue
      "#004C99", // Very dark blue
      "#003366", // Extra dark blue
      "#001A33", // Darkest blue
    ],
    red: [
      "#FFEBEE", // Very light red
      "#FFCDD2", // Light red
      "#FF9EA8", // Medium light red
      "#FF7285", // Medium red
      "#FF5252", // Standard glossy red
      "#E63946", // Medium dark red
      "#D32F2F", // Dark red
      "#B71C1C", // Very dark red
      "#951919", // Extra dark red
      "#731515", // Darkest red
    ],
    green: [
      "#E8F5E9", // Very light green
      "#C8E6C9", // Light green
      "#A5D6A7", // Medium light green
      "#81C784", // Medium green
      "#66BB6A", // Standard glossy green
      "#43A047", // Medium dark green
      "#388E3C", // Dark green
      "#2E7D32", // Very dark green
      "#1B5E20", // Extra dark green
      "#0E3311", // Darkest green
    ],
    orange: [
      "#FFF3E0", // Very light orange
      "#FFE0B2", // Light orange
      "#FFCC80", // Medium light orange
      "#FFB74D", // Medium orange
      "#FFA726", // Standard glossy orange
      "#FB8C00", // Medium dark orange
      "#F57C00", // Dark orange
      "#EF6C00", // Very dark orange
      "#E65100", // Extra dark orange
      "#BD4200", // Darkest orange
    ],
    yellow: [
      "#FFFDE7", // Very light yellow
      "#FFF9C4", // Light yellow
      "#FFF59D", // Medium light yellow
      "#FFF176", // Medium yellow
      "#FFEE58", // Standard glossy yellow
      "#FDD835", // Medium dark yellow
      "#FBC02D", // Dark yellow
      "#F9A825", // Very dark yellow
      "#F57F17", // Extra dark yellow
      "#A05514", // Darkest yellow
    ],
    violet: [
      "#EDE7F6", // Very light violet
      "#D1C4E9", // Light violet
      "#B39DDB", // Medium light violet
      "#9575CD", // Medium violet
      "#7E57C2", // Standard glossy violet
      "#5E35B1", // Medium dark violet
      "#512DA8", // Dark violet
      "#4527A0", // Very dark violet
      "#311B92", // Extra dark violet
      "#25156E", // Darkest violet
    ],
    pink: [
      "#FCE4EC", // Very light pink
      "#F8BBD0", // Light pink
      "#F48FB1", // Medium light pink
      "#F06292", // Medium pink
      "#EC407A", // Standard glossy pink
      "#D81B60", // Medium dark pink
      "#C2185B", // Dark pink
      "#AD1457", // Very dark pink
      "#880E4F", // Extra dark pink
      "#5D0935", // Darkest pink
    ],
    grape: [
      "#F3E5F5", // Very light grape
      "#E1BEE7", // Light grape
      "#CE93D8", // Medium light grape
      "#BA68C8", // Medium grape
      "#AB47BC", // Standard glossy grape
      "#8E24AA", // Medium dark grape
      "#7B1FA2", // Dark grape
      "#6A1B9A", // Very dark grape
      "#4A148C", // Extra dark grape
      "#38106D", // Darkest grape
    ],
    teal: [
      "#E0F2F1", // Very light teal
      "#B2DFDB", // Light teal
      "#80CBC4", // Medium light teal
      "#4DB6AC", // Medium teal
      "#26A69A", // Standard glossy teal
      "#00897B", // Medium dark teal
      "#00796B", // Dark teal
      "#00695C", // Very dark teal
      "#004D40", // Extra dark teal
      "#003329", // Darkest teal
    ],
    cyan: [
      "#E0F7FA", // Very light cyan
      "#B2EBF2", // Light cyan
      "#80DEEA", // Medium light cyan
      "#4DD0E1", // Medium cyan
      "#26C6DA", // Standard glossy cyan
      "#00ACC1", // Medium dark cyan
      "#0097A7", // Dark cyan
      "#00838F", // Very dark cyan
      "#006064", // Extra dark cyan
      "#004046", // Darkest cyan
    ],
    lime: [
      "#F9FBE7", // Very light lime
      "#F0F4C3", // Light lime
      "#E6EE9C", // Medium light lime
      "#DCE775", // Medium lime
      "#D4E157", // Standard glossy lime
      "#C0CA33", // Medium dark lime
      "#AFB42B", // Dark lime
      "#9E9D24", // Very dark lime
      "#827717", // Extra dark lime
      "#5A5311", // Darkest lime
    ],
    indigo: [
      "#E8EAF6", // Very light indigo
      "#C5CAE9", // Light indigo
      "#9FA8DA", // Medium light indigo
      "#7986CB", // Medium indigo
      "#5C6BC0", // Standard glossy indigo
      "#3949AB", // Medium dark indigo
      "#303F9F", // Dark indigo
      "#283593", // Very dark indigo
      "#1A237E", // Extra dark indigo
      "#111761", // Darkest indigo
    ],
    dark: [
      "#C1C7D0",
      "#A9B2BF",
      "#8E99A8",
      "#6E7A8A",
      "#515A68",
      "#3D4552",
      "#2A303A",
      "#1C212A",
      "#12161D",
      "#080A0F",
    ],
    gray: [
      "#F5F7FA",
      "#E4E9F0",
      "#D3DAE3",
      "#C0C9D6",
      "#A6B1C1",
      "#8896AB",
      "#6E7F94",
      "#586579",
      "#424C5D",
      "#2E3440",
    ],
  },

  // Shadows for the glossy effect
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(255, 255, 255, 0.25) inset",
    sm: "0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.35) inset",
    md: "0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(255, 255, 255, 0.4) inset",
    lg: "0 8px 16px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(255, 255, 255, 0.45) inset",
    xl: "0 12px 24px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(255, 255, 255, 0.5) inset",
  },

  // Component-specific overrides
  components: {
    // Adjust AppShell ( Header/Footer/Navbar ) for Aero
    AppShell: AppShell.extend({
      styles(theme) {
        return {
          header: {
            backgroundColor: rgba(theme.colors.aeroBlue[1], 0.5),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.white, 0.2)}`,
            boxShadow: theme.shadows.sm,
          },
          footer: {
            backgroundColor: rgba(theme.white, 0.5),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.white, 0.2)}`,
            boxShadow: theme.shadows.sm,
            color: theme.colors.dark["8"],
          },
          root: {
            backgroundColor: "unset",
            backgroundImage: `linear-gradient(to bottom, ${theme.colors.aeroBlue[1]}, ${theme.colors.aeroBlue[5]})`,
            //backgroundImage: "url(/assets/wallpapers/aero.jpg)",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          },
          main: {
            backgroundColor: "unset",
            // backgroundImage: "url(/assets/wallpapers/aero.jpg)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          },
        };
      },
    }),

    // Adjust Button for Aero
    Button: Button.extend({
      classNames(theme, props, ctx) {
        return {
          root: props.color ? "" : "frutiger-aero-theme-button",
        };
      },

      styles(theme, props) {
        const color = props.color;

        return {
          root: {
            backgroundImage: `linear-gradient(to bottom, ${
              color ? theme.colors[color.split(".")[0]][3] : theme.colors.aeroBlue[3]
            }, ${color ? theme.colors[color.split(".")[0]][5] : theme.colors.aeroBlue[5]})`,
            // border: `1px solid ${theme.colors.aeroBlue[6]}`,
            border: "none",
            boxShadow: theme.shadows.sm,
            color: theme.white,
          },
        };
      },
    }),
    // Adjust ActionIcon for Aero
    ActionIcon: ActionIcon.extend({
      classNames: {
        root: "frutiger-aero-theme-actionIcon",
      },
      styles(theme) {
        return {
          root: {
            backgroundImage: `linear-gradient(to bottom, ${theme.colors.aeroBlue[3]}, ${theme.colors.aeroBlue[5]})`,
            // border: `1px solid ${theme.colors.aeroBlue[6]}`,
            border: "none",
            boxShadow: theme.shadows.sm,
            color: theme.white,
          },
        };
      },
    }),

    // Adjust Card for Aero
    Card: Card.extend({
      styles(theme) {
        return {
          root: {
            backgroundColor: rgba(theme.white, 0.25),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.white, 0.2)}`,
            boxShadow: theme.shadows.md,
          },
        };
      },
    }),

    // Adjust Paper for Aero
    Paper: Paper.extend({
      styles(theme) {
        return {
          root: {
            backgroundColor: rgba(theme.white, 0.5),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.white, 0.2)}`,
            boxShadow: theme.shadows.md,
          },
        };
      },
    }),

    // Adjust Modal for Aero
    Modal: Modal.extend({
      styles(theme) {
        return {
          modal: {
            backgroundColor: rgba(theme.white, 0.9),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.white, 0.3)}`,
            boxShadow: theme.shadows.lg,
          },
          title: {
            fontWeight: 500,
          },
        };
      },
    }),

    // Adjust Inputs ( Input, SegmentedControl, Switch ) for Aero
    Input: Input.extend({
      styles(theme) {
        return {
          input: {
            backgroundColor: rgba(theme.white, 0.75),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.colors.aeroBlue[5], 0.3)}`,
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            color: theme.colors.dark[7],
          },
        };
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      styles(theme) {
        return {
          root: {
            backgroundColor: rgba(theme.white, 0.75),
            backdropFilter: "blur(10px)",
            border: `1px solid ${rgba(theme.colors.aeroBlue[5], 0.3)}`,
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          },
          indicator: {
            backgroundImage: `linear-gradient(to bottom, ${theme.colors.aeroBlue[3]}, ${theme.colors.aeroBlue[5]})`,
            border: "none",
          },
          label: {
            color: theme.colors.dark[7],
          },
        };
      },
    }),
    Switch: Switch.extend({
      styles(theme, props, ctx) {
        return {
          track: {
            backgroundColor: props.checked ? theme.colors.green[6] : rgba(theme.white, 0.75),
            border: `1px solid ${rgba(theme.colors.aeroBlue[5], 0.3)}`,
          },
          thumb: {
            backgroundColor: props.checked ? theme.white : theme.colors.green[4],
            border: `1px solid ${rgba(theme.colors.aeroBlue[5], 0.3)}`,
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          },
        };
      },
    }),

    // Adjust UnstyledButton ( Categories, Tabs??? ) for Aero
    UnstyledButton: UnstyledButton.extend({
      styles(theme, props, ctx) {
        if (props?.className?.includes("tab")) {
          // @ts-ignore
          const isTabSelected = props?.["aria-selected"];

          // For Tabs
          return {
            root: {
              backgroundImage: isTabSelected
                ? `linear-gradient(to bottom, ${theme.colors.aeroBlue[3]}, ${theme.colors.aeroBlue[5]})`
                : "none",
              // border: `1px solid ${theme.colors.aeroBlue[6]}`,
              border: "none",
              boxShadow: theme.shadows.sm,
              color: theme.colors.dark[7],
            },
          };
        } else {
          // @ts-ignore
          const isTabSelected = props?.["aria-selected"];

          // For Categories
          return {
            root: {
              backgroundColor: "transparent",
              backgroundImage: isTabSelected
                ? `linear-gradient(to bottom, ${theme.colors.aeroBlue[3]}, ${theme.colors.aeroBlue[5]})`
                : `linear-gradient(to bottom, ${theme.colors.gray[3]}, ${theme.colors.gray[5]})`,
              // border: `1px solid ${theme.colors.aeroBlue[6]}`,
              border: "none",
              boxShadow: theme.shadows.sm,
              color: theme.colors.dark[7],
            },
          };
        }
      },
    }),

    Tabs: Tabs.extend({
      classNames: {
        root: "frutiger-aero-theme-tabs",
      },
      styles(theme, props, ctx) {
        return {
          root: {
            borderBottom: "none",
          },
        };
      },
    }),

    // Adjus Text for Aero
    Text: Text.extend({
      styles(theme) {
        return {
          root: {
            color: theme.colors.dark[7],
          },
        };
      },
    }),
  },

  // Blur effect for elements with transparency
  other: {
    aeroGlass: {
      backdropFilter: "blur(10px)",
      backgroundColor: rgba("#ffffff", 0.7),
    },
  },
};
