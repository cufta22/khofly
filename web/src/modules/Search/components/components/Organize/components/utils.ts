export const removeSubdomain = (domain: string) => {
  // Remove protocol (http://, https://)
  const cleanedDomain = domain.replace(/^(https?:\/\/)?/, "");

  // Split the domain into parts
  const parts = cleanedDomain.split(".");

  // Check if there are at least two parts (domain and TLD)
  if (parts.length >= 2) {
    // Return the last two parts joined by a dot (domain and TLD)
    return parts.slice(-2).join(".");
  } else {
    // If there are fewer than two parts, return the original domain
    return domain;
  }
};

export const popularDomainNameMap: { [key: string]: string } = {
  "google.com": "Google",
  "youtube.com": "YouTube",
  "facebook.com": "Facebook",
  "twitter.com": "X (formerly Twitter)",
  "instagram.com": "Instagram",
  "amazon.com": "Amazon",
  "wikipedia.org": "Wikipedia",
  "reddit.com": "Reddit",
  "linkedin.com": "LinkedIn",
  "github.com": "GitHub",
  "netflix.com": "Netflix",
  "yahoo.com": "Yahoo",
  "microsoft.com": "Microsoft",
  "apple.com": "Apple",
  "nytimes.com": "The New York Times",
  "bbc.com": "BBC",
  "espn.com": "ESPN",
  "cnn.com": "CNN",
  "walmart.com": "Walmart",
  "ebay.com": "eBay",
  "craigslist.org": "Craigslist",
  "pinterest.com": "Pinterest",
  "tiktok.com": "TikTok",
  "twitch.tv": "Twitch",
  "discord.com": "Discord",
  "spotify.com": "Spotify",
  "paypal.com": "PayPal",
  "adobe.com": "Adobe",
  "salesforce.com": "Salesforce",
  "wordpress.com": "WordPress.com",
  "medium.com": "Medium",
  "vimeo.com": "Vimeo",
  "dropbox.com": "Dropbox",
  "slack.com": "Slack",
  "zoom.us": "Zoom",
  "canva.com": "Canva",
  "quora.com": "Quora",
  "indeed.com": "Indeed",
  "booking.com": "Booking.com",
  "tripadvisor.com": "Tripadvisor",
  "reuters.com": "Reuters",
  "bloomberg.com": "Bloomberg",
  "wsj.com": "The Wall Street Journal",
  "huffpost.com": "HuffPost",
  "msn.com": "MSN",
  "weather.com": "The Weather Channel",
  "irs.gov": "IRS",
  "cdc.gov": "CDC",
  "nih.gov": "NIH",
  "fandom.com": "Fandom",
  "etsy.com": "Etsy",
  "soundcloud.com": "SoundCloud",
  "telegram.org": "Telegram",
  "gitlab.com": "GitLab",
  "stackexchange.com": "Stack Exchange",
  "steampowered.com": "Steam",
  "roblox.com": "Roblox",
  "epicgames.com": "Epic Games",
};
