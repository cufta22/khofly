// Test: Custom cookie storage object because of SSR

import { getCookie, removeCookie, setCookie } from "@utils/functions/cookies";
import type { StateStorage } from "zustand/middleware";

export const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return getCookie(`app-${name}`);

    // const cookieVal = getCookie(`app-${name}`);
    // return Buffer.from(encodeURIComponent(cookieVal), "base64").toString();
  },
  setItem: (name: string, value: string): void => {
    // const cookieVal = Buffer.from(encodeURIComponent(value)).toString("base64");

    setCookie(`app-${name}`, value, {
      expires: 123,
    });
  },
  removeItem: (name: string): void => {
    removeCookie(name);
  },
};
