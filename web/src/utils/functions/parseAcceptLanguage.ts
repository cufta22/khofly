import { ILanguage } from "@ts/global.types";

export const parseAcceptLanguage = (
  headerString: string | null
): ILanguage | "" => {
  if (!headerString) {
    return "";
  }

  // Check if users language exists in current locales
  if (headerString.includes("en")) {
    return "en";
  }

  return "";
};
