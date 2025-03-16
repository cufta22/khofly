import type { IITEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_IT: {
  type: "divider" | "engine";
  value: IITEngines | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  bang: string;
  safeSearch: boolean;
  timeRange: boolean;
}[] = [
  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_IT2",
    bang: "!packages",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "crates",
    alt: "Crates logo",
    icon: "",
    label: "pages.settings.engines.engine_crates_IT",
    bang: "!crates",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "dockerhub",
    alt: "Docker logo",
    icon: "/assets/engines/docker-icon.svg",
    label: "pages.settings.engines.engine_docker_hub_IT",
    bang: "!dh",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "npm",
    alt: "NPM logo",
    icon: "/assets/engines/npm-icon.svg",
    label: "pages.settings.engines.engine_NPM_IT",
    bang: "!npm",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "packagist",
    alt: "Packagist logo",
    icon: "",
    label: "pages.settings.engines.engine_packagist_IT",
    bang: "!pack",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pkggodev",
    alt: "Go Packages logo",
    icon: "/assets/engines/go-icon.svg",
    label: "pages.settings.engines.engine_pkg_go_IT",
    bang: "!pgo",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pypi",
    alt: "PyPi logo",
    icon: "/assets/engines/pypi-icon.svg",
    label: "pages.settings.engines.engine_pypi_IT",
    bang: "!pypi",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "rubygems",
    alt: "Ruby logo",
    icon: "/assets/engines/rubygems-icon.svg",
    label: "pages.settings.engines.engine_ruby_gems_IT",
    bang: "!rbg",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "void",
    alt: "Void logo",
    icon: "/assets/engines/void-icon.svg",
    label: "pages.settings.engines.engine_void_IT",
    bang: "!void",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_IT3",
    bang: "!q&a",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "askubuntu",
    alt: "Ask Ubuntu logo",
    icon: "/assets/engines/askubuntu-icon.svg",
    label: "pages.settings.engines.engine_ask_ubuntu_IT",
    bang: "!ubuntu",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "stackoverflow",
    alt: "StackOverflow logo",
    icon: "/assets/engines/stackoverflow-icon.svg",
    label: "pages.settings.engines.engine_stack_overflow_IT",
    bang: "!st",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "superuser",
    alt: "Superuser logo",
    icon: "/assets/engines/superuser-icon.svg",
    label: "pages.settings.engines.engine_superuser_IT",
    bang: "!su",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_IT4",
    bang: "!repos",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "bitbucket",
    alt: "BitBucket logo",
    icon: "/assets/engines/bitbucket-icon.svg",
    label: "pages.settings.engines.engine_bitbucket_IT",
    bang: "!bb",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "codeberg",
    alt: "Codeberg logo",
    icon: "/assets/engines/codeberg-icon.svg",
    label: "pages.settings.engines.engine_codeberg_IT",
    bang: "!cb",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "github",
    alt: "GitHub logo",
    icon: "/assets/engines/gh-dark-icon.svg",
    label: "pages.settings.engines.engine_github_IT",
    bang: "!gh",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "gitlab",
    alt: "GitLab logo",
    icon: "/assets/engines/gitlab-icon.svg",
    label: "pages.settings.engines.engine_gitlab_IT",
    bang: "!gl",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_IT5",
    bang: "!software_wikis",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "archwiki",
    alt: "Arch logo",
    icon: "/assets/engines/arch-icon.svg",
    label: "pages.settings.engines.engine_arch_IT",
    bang: "!al",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "gentoo",
    alt: "Gentoo logo",
    icon: "/assets/engines/gentoo-icon.svg",
    label: "pages.settings.engines.engine_gentoo_IT",
    bang: "!ge",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "nixoswiki",
    alt: "Nixos logo",
    icon: "/assets/engines/nix-icon.svg",
    label: "pages.settings.engines.engine_nixos_IT",
    bang: "!nixw",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_without",
    bang: "",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "hackernews",
    alt: "HackerNews logo",
    icon: "/assets/engines/hackernews-icon.svg",
    label: "pages.settings.engines.engine_hackernews_IT",
    bang: "!hn",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "mankier",
    alt: "ManKier logo",
    icon: "",
    label: "pages.settings.engines.engine_mankier_IT",
    bang: "!man",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "mdn",
    alt: "MDN logo",
    icon: "/assets/engines/mdn-icon.svg",
    label: "pages.settings.engines.engine_MDN_IT",
    bang: "!mdn",
    safeSearch: false,
    timeRange: false,
  },
];
