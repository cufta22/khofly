import { MantineThemeComponents, MantineThemeOverride } from "@mantine/core";

const a: MantineThemeComponents = {
  Select: { defaultProps: { style: { border: "none" } } },
};

// Catppuccin - Mocha theme
export const THEME_NORD: MantineThemeOverride = {
  /** Put your mantine theme override here */
  fontFamily: `'Inter', sans-serif`,
  cursorType: "pointer",
  // autoContrast: true,

  components: a,

  colors: {
    blue: [
      "#edf4ff",
      "#dde7f3",
      "#bcccde",
      "#99afca",
      "#7b97b9",
      "#6888af",
      "#5d80ab",
      "#4c6e97",
      "#416189",
      "#31557a",
    ],
    red: [
      "#ffecef",
      "#f7dbde",
      "#e5b7bb",
      "#d39097",
      "#c57078",
      "#bc5b64",
      "#b94f5a",
      "#a43f4a",
      "#933741",
      "#822c36",
    ],
    green: [
      "#f1fae9",
      "#e5efdd",
      "#cbdbbd",
      "#afc79b",
      "#98b67e",
      "#89ac6b",
      "#80a661",
      "#6e9150",
      "#608245",
      "#517037",
    ],
    orange: [
      "#ffefe9",
      "#f8e0d7",
      "#e8bfb2",
      "#da9d8a",
      "#cd8067",
      "#c66d51",
      "#c36445",
      "#ad5336",
      "#9b482f",
      "#893c25",
    ],
    yellow: [
      "#fff7e4",
      "#faedd3",
      "#f0d9a9",
      "#e8c47b",
      "#e1b255",
      "#dda73c",
      "#dba12d",
      "#c28c1f",
      "#ad7c17",
      "#966a09",
    ],
    violet: [
      "#fff0fb",
      "#f0e1ed",
      "#d9c2d5",
      "#c2a2bd",
      "#af86a7",
      "#a3749a",
      "#9e6b95",
      "#895a81",
      "#7c4e74",
      "#6d4166",
    ],
    pink: [
      "#fff0fb",
      "#f0e1ed",
      "#d9c2d5",
      "#c2a2bd",
      "#af86a7",
      "#a3749a",
      "#9e6b95",
      "#895a81",
      "#7c4e74",
      "#6d4166",
    ],
    grape: [
      "#fff0fb",
      "#f0e1ed",
      "#d9c2d5",
      "#c2a2bd",
      "#af86a7",
      "#a3749a",
      "#9e6b95",
      "#895a81",
      "#7c4e74",
      "#6d4166",
    ],
    teal: [
      "#e4fafa",
      "#daefef",
      "#bedbda",
      "#9cc5c4",
      "#81b4b2",
      "#6ea9a7",
      "#63a3a2",
      "#508f8e",
      "#427f7e",
      "#2d6e6f",
    ],
    cyan: [
      "#e5f9ff",
      "#d8eef5",
      "#b6d9e4",
      "#90c4d3",
      "#71b3c5",
      "#5ca7bd",
      "#4fa2b9",
      "#3d8da4",
      "#2f7e93",
      "#126e82",
    ],
    lime: [
      "#e7f7ff",
      "#dbe8f4",
      "#bacde1",
      "#96b2cd",
      "#789abd",
      "#648bb3",
      "#5884af",
      "#48719a",
      "#3b658c",
      "#2b587d",
    ],
    indigo: [
      "#edf4ff",
      "#dde7f3",
      "#bcccde",
      "#99afca",
      "#7b97b9",
      "#6888af",
      "#5d80ab",
      "#4c6e97",
      "#416189",
      "#31557a",
    ],
    dark: [
      "#f3f4f6",
      "#e6e6e6",
      "#c9cbcd",
      "#aaaeb5",
      "#434c5e",
      "#434c5e",
      "#3b4252",
      "#3b4252",
      "#2e3440",
      "#2e3440",
    ],
    gray: [
      "#eff4fe",
      "#e1e5ee",
      "#c0c9d8",
      "#9eabc3",
      "#8192b1",
      "#6e82a7",
      "#657aa2",
      "#54688f",
      "#495c81",
      "#3b5074",
    ],
  },
};
