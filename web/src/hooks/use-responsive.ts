import { type MantineSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// Usage example:
// const isXs = useResponsive("max", "xs");

export const useResponsive = (
  target: "min" | "max",
  bp: MantineSize | number,
  initialValue?: boolean
) => {
  const theme = useMantineTheme();

  const matches = useMediaQuery(
    `(${target}-width: ${typeof bp === "number" ? `${bp}px` : theme.breakpoints[bp]})`,
    initialValue || false
  );

  return matches;
};
