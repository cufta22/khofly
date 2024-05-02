// Returns instance closest to user location
// [ Africa, America, Antarctica, Asia, Atlantic, Australia, Europe, Indian, Pacific ]
// TODO: replace with appropriate URL when servers are available
const DEFAULT_1 = "https://searxng-eu1.khofly.com";
const DEFAULT_2 = "https://api-eu1.khofly.com";

export const getDefaultSearXNG = (): string => {
  if (process.env.SELF_HOST === "1") {
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
      return process.env.SEARXNG_URL_US1 || DEFAULT_1;

    default:
      return process.env.SEARXNG_URL_EU1 || DEFAULT_1;
  }
};

export const getDefaultKhoflyAPI = (): string => {
  if (process.env.SELF_HOST === "1") {
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
      return process.env.API_URL_US1 || DEFAULT_2;

    default:
      return process.env.API_URL_EU1 || DEFAULT_2;
  }
};
