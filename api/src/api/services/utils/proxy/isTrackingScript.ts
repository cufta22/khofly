const TRACKING_CONTENTS = [
  // Possible tracking script URL contents
  "cloudflareinsights.com/beacon",
];

export const isTrackingScript = (src: string) => {
  let isTracker = false;

  for (const trackerPart of TRACKING_CONTENTS) {
    if (src.includes(trackerPart)) {
      isTracker = true;
    }
  }

  return isTracker;
};
