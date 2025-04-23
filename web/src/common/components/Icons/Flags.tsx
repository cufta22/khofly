import type { FlagProps } from "./types";
import clsx from "clsx";

import classes from "./styles.module.scss";
import { Box, getRadius, rem } from "@mantine/core";

export const USFlag: React.FC<FlagProps> = ({ radius, className, size, ...others }) => {
  return (
    <Box
      className={clsx(classes.flag, className)}
      __vars={{ "--flag-radius": getRadius(radius), "--flag-size": rem(size) }}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
        <title>USFlag</title>
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

export const GBFlag: React.FC<FlagProps> = ({ radius, className, size, ...others }) => {
  return (
    <Box
      className={clsx(classes.flag, className)}
      __vars={{ "--flag-radius": getRadius(radius), "--flag-size": rem(size) }}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 24">
        <mask
          id="mantine-q5nqj8b9u"
          style={{ maskType: "alpha" }}
          width="32"
          height="24"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#fff" d="M0 0h32v24H0z" />
        </mask>
        <g mask="url(#mantine-q5nqj8b9u)">
          <path fill="#2E42A5" fillRule="evenodd" d="M0 0v24h32V0H0z" clipRule="evenodd" />
          <mask
            id="mantine-mrqnuv42i"
            style={{ maskType: "alpha" }}
            width="32"
            height="24"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
          >
            <path fill="#fff" fillRule="evenodd" d="M0 0v24h32V0H0z" clipRule="evenodd" />
          </mask>
          <g mask="url(#mantine-mrqnuv42i)">
            <mask
              id="mantine-36dflcj2b"
              style={{ maskType: "alpha" }}
              width="32"
              height="24"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#fff" d="M0 0h32v24H0z" />
            </mask>
            <g mask="url(#mantine-36dflcj2b)">
              <path
                fill="#fff"
                d="M-3.563 22.285l7.042 2.979 28.68-22.026 3.715-4.426-7.53-.995-11.698 9.491-9.416 6.396-10.793 8.581z"
              />
              <path fill="#F50100" d="M-2.6 24.372L.989 26.1 34.54-1.599h-5.037l-32.102 25.97z" />
              <path
                fill="#fff"
                d="M35.563 22.285l-7.042 2.979L-.159 3.238l-3.715-4.426 7.53-.995 11.698 9.491 9.416 6.396 10.793 8.581z"
              />
              <path
                fill="#F50100"
                d="M35.323 23.783l-3.588 1.728-14.286-11.86-4.236-1.324-17.445-13.5H.806l17.434 13.18 4.631 1.588 12.452 10.188z"
              />
              <mask id="mantine-z2l9mj12j" fill="#fff">
                <path
                  fillRule="evenodd"
                  d="M19.778-2h-7.556V8H-1.972v8h14.194v10h7.556V16h14.25V8h-14.25V-2z"
                  clipRule="evenodd"
                />
              </mask>
              <path
                fill="#F50100"
                fillRule="evenodd"
                d="M19.778-2h-7.556V8H-1.972v8h14.194v10h7.556V16h14.25V8h-14.25V-2z"
                clipRule="evenodd"
              />
              <path
                fill="#fff"
                d="M12.222-2v-2h-2v2h2zm7.556 0h2v-2h-2v2zM12.222 8v2h2V8h-2zM-1.972 8V6h-2v2h2zm0 8h-2v2h2v-2zm14.194 0h2v-2h-2v2zm0 10h-2v2h2v-2zm7.556 0v2h2v-2h-2zm0-10v-2h-2v2h2zm14.25 0v2h2v-2h-2zm0-8h2V6h-2v2zm-14.25 0h-2v2h2V8zm-7.556-8h7.556v-4h-7.556v4zm2 8V-2h-4V8h4zm-16.194 2h14.194V6H-1.972v4zm2 6V8h-4v8h4zm12.194-2H-1.972v4h14.194v-4zm2 12V16h-4v10h4zm5.556-2h-7.556v4h7.556v-4zm-2-8v10h4V16h-4zm16.25-2h-14.25v4h14.25v-4zm-2-6v8h4V8h-4zm-12.25 2h14.25V6h-14.25v4zm-2-12V8h4V-2h-4z"
                mask="url(#mantine-z2l9mj12j)"
              />
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
};
