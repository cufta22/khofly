import type { FlagProps } from "../types";
import classes from "../styles.module.scss";
import clsx from "clsx";
import { Box, getRadius, rem } from "@mantine/core";

export const DEFlag: React.FC<FlagProps> = ({ radius, className, size, ...others }) => {
  return (
    <Box
      className={clsx(classes.flag, className)}
      __vars={{ "--flag-radius": getRadius(radius), "--flag-size": rem(size) }}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
        <title>DEFlag</title>
        <mask id="mantine-3y10sj8mf" fill="#fff">
          <path fillRule="evenodd" d="M0 0h32v24H0z" />
        </mask>
        <g fill="none" fillRule="evenodd" mask="url(#mantine-3y10sj8mf)">
          <path fill="#ffd018" d="M0 16h32v6a2 2 0 01-2 2H2a2 2 0 01-2-2z" />
          <path fill="#e31d1c" d="M0 8h32v8H0z" />
          <path fill="#272727" d="M2 0h28a2 2 0 012 2v6H0V2a2 2 0 012-2z" />
        </g>
      </svg>
    </Box>
  );
};
