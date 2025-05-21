// Returns instance closest to user location
// [ Africa, America, Antarctica, Asia, Atlantic, Australia, Europe, Indian, Pacific ]

import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

// TODO: replace with appropriate URL when servers are available
const DEFAULT_SEARXNG = "https://searxng-eu1.khofly.com";
const DEFAULT_API = "https://api-eu1.khofly.com";
const DEFAULT_PV = "https://pv-eu1.khofly.com";
const DEFAULT_WORKER = "https://ai-worker.khofly.com";

export const getDefaultSearXNG = (): string => {
  if (IS_SELF_HOST) {
    return process.env.SEARXNG_URL_SELF_HOST || DEFAULT_SEARXNG;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return process.env.SEARXNG_URL_EU1 || DEFAULT_SEARXNG;

    case "America":
    case "Atlantic":
    case "Australia":
      return process.env.SEARXNG_URL_EU1 || DEFAULT_SEARXNG;

    default:
      return process.env.SEARXNG_URL_EU1 || DEFAULT_SEARXNG;
  }
};

export const getDefaultApi = (): string => {
  if (IS_SELF_HOST) {
    return process.env.API_URL_SELF_HOST || DEFAULT_API;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return process.env.API_URL_EU1 || DEFAULT_API;

    case "America":
    case "Atlantic":
    case "Australia":
      return process.env.API_URL_EU1 || DEFAULT_API;

    default:
      return process.env.API_URL_EU1 || DEFAULT_API;
  }
};

export const getDefaultPv = (): string => {
  if (IS_SELF_HOST) {
    return process.env.PV_URL_SELF_HOST || DEFAULT_PV;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Asia":
    case "Europe":
      return process.env.PV_URL_EU1 || DEFAULT_PV;

    case "America":
    case "Atlantic":
    case "Australia":
      return process.env.PV_URL_EU1 || DEFAULT_PV;

    default:
      return process.env.PV_URL_EU1 || DEFAULT_PV;
  }
};

export const getDefaultWorker = (): string => {
  return process.env.WORKER_URL || DEFAULT_WORKER;
};
