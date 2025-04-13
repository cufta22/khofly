import {
  AccordionItem,
  AppShellFooter,
  AppShellHeader,
  AppShellNavbar,
  Autocomplete,
  InputBase,
  type MantineThemeOverride,
  NumberInput,
  Paper,
  Select,
  TextInput,
  UnstyledButton,
} from "@mantine/core";

// Catppuccin - Mocha dark theme / Latte light theme

export const THEME_CATPPUCCIN: MantineThemeOverride = {
  /** Put your mantine theme override here */
  fontFamily: `'Inter', sans-serif`,
  cursorType: "pointer",
  autoContrast: true,

  black: "#11111b", // Text color on light color scheme
  white: "#cdd6f4", // Background color for some elements on light color scheme

  colors: {
    blue: [
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
    ],
    red: [
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
      "#f38ba8",
    ],
    green: [
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
      "#a6e3a1",
    ],
    orange: [
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
      "#fab387",
    ],
    yellow: [
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
      "#f9e2af",
    ],
    violet: [
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
      "#b4befe",
    ],
    pink: [
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
      "#f5c2e7",
    ],
    grape: [
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
      "#cba6f7",
    ],
    teal: [
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
      "#8bd5ca",
    ],
    cyan: [
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
      "#89dceb",
    ],
    lime: [
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
      "#74c7ec",
    ],
    indigo: [
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
      "#89b4fa",
    ],
    dark: [
      "#a6adc8",
      "#9399b2",
      "#7f849c",
      "#6c7086",
      "#585b70",
      "#45475a",
      "#313244", // Input BG | Dark
      "#181825", // Header/Footer, Elements BG | Dark
      "#1e1e2e", // Main BG | Dark
      "#11111b", // CodeHighlight BG | Dark
    ],
    gray: [
      "#cdd6f4",
      "#bac2de",
      "#a6adc8",
      "#9399b2",
      "#7f849c",
      "#6c7086",
      "#585b70",
      "#45475a",
      "#363a4f",
      "#1e1e2e",
    ],
  },

  components: {
    // Disable border for Quick settings items
    AccordionItem: AccordionItem.extend({
      defaultProps: {
        styles: {
          item: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for Search bar
    Autocomplete: Autocomplete.extend({
      defaultProps: {
        styles: {
          input: {
            borderColor: "transparent",
          },
          dropdown: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for Categories
    UnstyledButton: UnstyledButton.extend({
      defaultProps: {
        styles: {
          root: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for Header/Footer/Navbar
    AppShellHeader: AppShellHeader.extend({
      defaultProps: {
        styles: {
          header: {
            borderColor: "transparent",
          },
        },
      },
    }),
    AppShellFooter: AppShellFooter.extend({
      defaultProps: {
        styles: {
          footer: {
            borderColor: "transparent",
          },
        },
      },
    }),
    AppShellNavbar: AppShellNavbar.extend({
      defaultProps: {
        styles: {
          navbar: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for comboboxes
    InputBase: InputBase.extend({
      defaultProps: {
        styles: {
          input: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for selects
    Select: Select.extend({
      defaultProps: {
        styles: {
          input: {
            borderColor: "transparent",
          },
          dropdown: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for text input
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          input: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for number input
    NumberInput: NumberInput.extend({
      defaultProps: {
        styles: {
          input: {
            borderColor: "transparent",
          },
        },
      },
    }),

    // Disable border for paper elements
    Paper: Paper.extend({
      defaultProps: {
        styles: {
          root: {
            borderColor: "transparent",
          },
        },
      },
    }),
  },
};
