import { rem } from "@mantine/core";

export const getIconStyle = (size = 24, inline?: boolean): React.CSSProperties => ({
  width: rem(size),
  minWidth: rem(size),
  height: rem(size),
  display: inline ? "inline-block" : "flex",
});
