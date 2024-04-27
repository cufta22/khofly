import { IITEngines } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_IT: {
  type: "divider" | "engine";
  value: IITEngines | "";
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
    label: "pages.settings.engines.titleIT2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "dockerhub",
    alt: "Docker logo",
    icon: "/assets/engines/docker-icon.svg",
    label: "pages.settings.engines.engineDockerHubIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "npm",
    alt: "NPM logo",
    icon: "/assets/engines/npm-icon.svg",
    label: "pages.settings.engines.engineNPMIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pypi",
    alt: "PyPi logo",
    icon: "/assets/engines/pypi-icon.svg",
    label: "pages.settings.engines.enginePypiIT",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleIT3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "askubuntu",
    alt: "Ask Ubuntu logo",
    icon: "/assets/engines/askubuntu-icon.svg",
    label: "pages.settings.engines.engineAUIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "stackoverflow",
    alt: "StackOverflow logo",
    icon: "/assets/engines/stackoverflow-icon.svg",
    label: "pages.settings.engines.engineSOIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "superuser",
    alt: "Superuser logo",
    icon: "/assets/engines/superuser-icon.svg",
    label: "pages.settings.engines.engineSUIT",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleIT4",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "codeberg",
    alt: "Codeberg logo",
    icon: "/assets/engines/codeberg-icon.svg",
    label: "pages.settings.engines.engineCodebergIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "github",
    alt: "GitHub logo",
    icon: "/assets/engines/github-icon.svg",
    label: "pages.settings.engines.engineGHIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "gitlab",
    alt: "GitLab logo",
    icon: "/assets/engines/gitlab-icon.svg",
    label: "pages.settings.engines.engineGLIT",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.titleIT5",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "archwiki",
    alt: "Arch logo",
    icon: "/assets/engines/arch-icon.svg",
    label: "pages.settings.engines.engineArchIT",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "gentoo",
    alt: "Gentoo logo",
    icon: "/assets/engines/gentoo-icon.svg",
    label: "pages.settings.engines.engineGentooIT",
    safeSearch: false,
    timeRange: false,
  },

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
    value: "mdn",
    alt: "MDN logo",
    icon: "/assets/engines/mdn-icon.svg",
    label: "pages.settings.engines.engineMDNIT",
    safeSearch: false,
    timeRange: false,
  },
];
