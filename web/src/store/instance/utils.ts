// Returns instance closest to user location
// [ Africa, America, Antarctica, Asia, Atlantic, Australia, Europe, Indian, Pacific ]

import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

// TODO: replace with appropriate URL when servers are available
const DEFAULT_1 = "https://searxng-eu1.khofly.com";
const DEFAULT_2 = "https://api-eu1.khofly.com";
const DEFAULT_3 = "https://ai-worker.khofly.com";

export const getDefaultSearXNG = (): string => {
  if (IS_SELF_HOST) {
    return process.env.SEARXNG_URL_SELF_HOST || DEFAULT_1;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return process.env.SEARXNG_URL_EU1 || DEFAULT_1;

    case "America":
    case "Atlantic":
    case "Australia":
      return process.env.SEARXNG_URL_EU1 || DEFAULT_1;

    default:
      return process.env.SEARXNG_URL_EU1 || DEFAULT_1;
  }
};

export const getDefaultApi = (): string => {
  if (IS_SELF_HOST) {
    return process.env.API_URL_SELF_HOST || DEFAULT_2;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return process.env.API_URL_EU1 || DEFAULT_2;

    case "America":
    case "Atlantic":
    case "Australia":
      return process.env.API_URL_EU1 || DEFAULT_2;

    default:
      return process.env.API_URL_EU1 || DEFAULT_2;
  }
};

export const getDefaultWorker = (): string => {
  return process.env.WORKER_URL || DEFAULT_3;
};
