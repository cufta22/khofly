// Test: Custom cookie storage object because of SSR
import { getCookie, removeCookie, setCookie } from '@utils/functions/cookies';
import type { StateStorage } from 'zustand/middleware';

export const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return getCookie(`khofly-${name}`) || null;
  },
  setItem: (name: string, value: string): void => {
    setCookie(`khofly-${name}`, value, {
      expires: 31536000, // 1 year (60s * 60m * 24h * 365d)
      path: '/',
      sameSite: 'Strict',
    });
  },
  removeItem: (name: string): void => {
    removeCookie(name);
  },
};
