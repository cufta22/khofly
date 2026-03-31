import { ILanguage } from "@ts/global.types";

export const parseAcceptLanguage = (headerString: string | null): ILanguage | "" => {
  if (!headerString) return "";

  // Split by comma: "en-GB,en;q=0.9,..." -> ["en-GB", "en;q=0.9", ...]
  // Map to get the first part: "en-GB" -> "en", ...
  const languages = headerString.split(",").map((lang) => {
    const [locale] = lang.split(";"); // Remove ;q=0.9
    return locale.trim().split("-")[0].toLowerCase(); // Get "en" from "en-US"
  });

  // Check against your supported list in order of user preference
  const supported = ["en", "sr"];
  const match = languages.find((lang) => supported.includes(lang));

  return (match as ILanguage) || "en";
};
