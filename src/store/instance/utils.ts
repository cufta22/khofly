// Returns instance closest to user location
// [ Africa, America, Antarctica, Asia, Atlantic, Australia, Europe, Indian, Pacific ]

import { RootLoaderData } from "@ts/global.types";

// TODO: replace with appropriate URL when servers are available
const DEFAULT_1 = "https://searxng-eu1.khofly.com";

export const getDefaultSearXNG = (env: RootLoaderData["env"]): string => {
  if (env.IS_SELF_HOST === "1") {
    return env.SEARXNG_URL_SELF_HOST || DEFAULT_1;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return env.SEARXNG_URL_EU1 || DEFAULT_1;

    case "America":
    case "Atlantic":
    case "Australia":
      return env?.SEARXNG_URL_US1 || DEFAULT_1;

    default:
      return env?.SEARXNG_URL_EU1 || DEFAULT_1;
  }
};
