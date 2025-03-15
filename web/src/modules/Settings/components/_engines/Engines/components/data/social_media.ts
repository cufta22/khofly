import type { ISocialMediaEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_SOCIAL_MEDIA: {
  type: "divider" | "engine";
  value: ISocialMediaEngines | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  safeSearch: boolean;
  timeRange: boolean;
}[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_without",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "9gag",
    alt: "9gag logo",
    icon: "/assets/engines/9gag-icon.svg",
    label: "pages.settings.engines.engine_9gag_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmycomments",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engine_lemmy_comments_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmycommunities",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engine_lemmy_communities_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmyposts",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engine_lemmy_posts_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmyusers",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engine_lemmy_users_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mastodonhashtags",
    alt: "Mastodon logo",
    icon: "/assets/engines/mastodon-icon.svg",
    label: "pages.settings.engines.engine_mastodon_hashtags_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mastodonusers",
    alt: "Mastodon logo",
    icon: "/assets/engines/mastodon-icon.svg",
    label: "pages.settings.engines.engine_mastodon_users_SM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "reddit",
    alt: "Reddit logo",
    icon: "/assets/engines/reddit-icon.svg",
    label: "pages.settings.engines.engine_reddit_SM",
    safeSearch: false,
    timeRange: false,
  },
];
