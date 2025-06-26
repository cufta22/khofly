import { Box, Flex } from "@mantine/core";
import {
  IconBackspace,
  IconDivide,
  IconEqual,
  IconMinus,
  IconPlus,
  IconX,
  IconPercentage,
  IconCe,
  IconMathPi,
  IconSquareRoot2,
  IconLetterX,
  IconLetterY,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

export const BTN_VALUES = (variant: "basic" | "scientific") => [
  // Scientific keys
  [
    {
      value: "2nd",
      label: "2nd",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "deg",
      label: "deg",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "sin",
      label: "sin",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "cos",
      label: "cos",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "tan",
      label: "tan",
      color: "dark.7",
      variant: "scientific",
    },
  ],
  [
    {
      value: "to_the_power",
      label: (
        <Flex pos="relative" w={28}>
          <IconLetterX style={getIconStyle(14)} stroke={3} />{" "}
          <IconLetterY
            style={{
              ...getIconStyle(10),
              position: "absolute",
              bottom: 8,
              left: 12,
            }}
            stroke={3}
          />
        </Flex>
      ),
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "log",
      label: "log",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "ln",
      label: "ln",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "(",
      label: "(",
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: ")",
      label: ")",
      color: "dark.7",
      variant: "scientific",
    },
  ],

  // Basic + extra scientific keys
  [
    {
      value: "square_root",
      label: <IconSquareRoot2 style={getIconStyle(22)} />,
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "clear",
      label: <IconCe style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
    {
      value: "backspace",
      label: <IconBackspace style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
    {
      value: "%",
      label: <IconPercentage style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
    {
      value: "/",
      label: <IconDivide style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
  ],
  [
    {
      value: "x!",
      label: (
        <>
          <IconLetterX style={getIconStyle(14)} stroke={2.5} />!
        </>
      ),
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "7",
      label: "7",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "8",
      label: "8",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "9",
      label: "9",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "*",
      label: <IconX style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
  ],
  [
    {
      value: "1/x",
      label: (
        <>
          1 / <IconLetterX style={getIconStyle(14)} stroke={2.5} />
        </>
      ),
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "4",
      label: "4",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "5",
      label: "5",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "6",
      label: "6",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "-",
      label: <IconMinus style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
  ],
  [
    {
      value: "pi",
      label: <IconMathPi style={getIconStyle(22)} />,
      color: "dark.7",
      variant: "scientific",
    },
    {
      value: "1",
      label: "1",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "2",
      label: "2",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "3",
      label: "3",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "+",
      label: <IconPlus style={getIconStyle(22)} />,
      color: "dark.4",
      variant: "basic",
    },
  ],
  [
    {
      value: "switch",
      label:
        variant === "basic" ? (
          <IconMaximize style={getIconStyle(22)} />
        ) : (
          <IconMinimize style={getIconStyle(22)} />
        ),
      color: "teal",
      variant: "basic",
    },
    {
      value: "e",
      label: "e",
      color: "dark.6",
      variant: "scientific",
    },
    {
      value: "0",
      label: "0",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: ".",
      label: ".",
      color: "dark.6",
      variant: "basic",
    },
    {
      value: "equals",
      label: <IconEqual style={getIconStyle(22)} />,
      color: "blue",
      variant: "basic",
    },
  ],
];
