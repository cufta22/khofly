import { FlagProps } from "./types";
import clsx from "clsx";

import classes from "./styles.module.scss";
import { Box, getRadius, rem } from "@mantine/core";

export const USFlag: React.FC<FlagProps> = ({
  radius,
  className,
  size,
  ...others
}) => {
  return (
    <Box
      className={clsx(classes.flag, className)}
      __vars={{ "--flag-radius": getRadius(radius), "--flag-size": rem(size) }}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
        <mask id="mantine-5ozt72l3q" fill="#fff">
          <path fillRule="evenodd" d="M0 0h32v24H0z" />
        </mask>
        <g fill="none" fillRule="evenodd" mask="url(#mantine-5ozt72l3q)">
          <path fill="#f7fcff" d="M0 0h32v24H0z" />
          <path
            fill="#e31d1c"
            d="M0 14.667h32v2H0zm0 3.666h32v2H0zm0-11h32v2H0zM0 22h32v2H0zm0-11h32v2H0zM0 0h32v2H0zm0 3.667h32v2H0z"
          />
          <path fill="#2e42a5" d="M0 0h20v13H0z" />
          <path
            fill="#f7fcff"
            d="M1.721 9.229l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm-14-2l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm-6-2l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm-12 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm12 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm-14-2l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm-14-2l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842zm4 0l.331.739h.718l-.564.574.218.906-.702-.51-.726.51.245-.906-.644-.574h.842z"
          />
        </g>
      </svg>
    </Box>
  );
};

export const DEFlag: React.FC<FlagProps> = ({
  radius,
  className,
  size,
  ...others
}) => {
  return (
    <Box
      className={clsx(classes.flag, className)}
      __vars={{ "--flag-radius": getRadius(radius), "--flag-size": rem(size) }}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
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
