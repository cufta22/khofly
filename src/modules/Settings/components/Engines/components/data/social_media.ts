import { ISocialMediaEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

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
    label: "pages.settings.engines.titleWithout",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "9gag",
    alt: "9gag logo",
    icon: "/assets/engines/9gag-icon.svg",
    label: "pages.settings.engines.engine9gagSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmycomments",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engineLemmyCommentsSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmycommunities",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engineLemmyCommunitiesSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmyposts",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engineLemmyPostsSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "lemmyusers",
    alt: "Lemmy logo",
    icon: "/assets/engines/lemmy-icon.svg",
    label: "pages.settings.engines.engineLemmyUsersSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mastodonhashtags",
    alt: "Mastodon logo",
    icon: "/assets/engines/mastodon-icon.svg",
    label: "pages.settings.engines.engineMastodonHashtagsSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mastodonusers",
    alt: "Mastodon logo",
    icon: "/assets/engines/mastodon-icon.svg",
    label: "pages.settings.engines.engineMastodonUsersSM",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "reddit",
    alt: "Reddit logo",
    icon: "/assets/engines/reddit-icon.svg",
    label: "pages.settings.engines.engineRedditSM",
    safeSearch: false,
    timeRange: false,
  },
];
