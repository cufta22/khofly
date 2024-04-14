// Returns instance closest to user location
// [ Africa, America, Antarctica, Asia, Atlantic, Australia, Europe, Indian, Pacific ]
// TODO: replace with appropriate URL when servers are available
const DEFAULT = "https://searxng-eu1.khofly.com";

export const getDefaultSearXNG = (): string => {
  if (process.env.SELF_HOST === "1") {
    return process.env.SEARXNG_URL_DEFAULT || DEFAULT;
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0];

  switch (tz) {
    case "Africa":
    case "Europe":
      return process.env.SEARXNG_URL_EU1 || DEFAULT;

    case "America":
    case "Asia":
    case "Atlantic":
    case "Australia":
      return process.env.SEARXNG_URL_US1 || DEFAULT;

    default:
      return process.env.SEARXNG_URL_EU1 || DEFAULT;
  }
};
