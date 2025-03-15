import type { IScienceEngines } from "@store/engines";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export const DATA_ENGINES_SCIENCE: {
  type: "divider" | "engine";
  value: IScienceEngines | "";
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
    label: "pages.settings.engines.title_science2",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "arxiv",
    alt: "Arxiv logo",
    icon: "/assets/engines/arxiv-icon.svg",
    label: "pages.settings.engines.engine_arxiv_science",
    safeSearch: false,
    timeRange: true,
  },
  {
    type: "engine",
    value: "crossref",
    alt: "Crossref logo",
    icon: "/assets/engines/crossref-icon.svg",
    label: "pages.settings.engines.engine_crossref_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "googlescholar",
    alt: "Google Scholar logo",
    icon: "/assets/engines/google-scholar-icon.svg",
    label: "pages.settings.engines.engine_google_scholar_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "archive",
    alt: "Archive logo",
    icon: "",
    label: "pages.settings.engines.engine_IAS_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pubmed",
    alt: "PubMed logo",
    icon: "/assets/engines/pubmed-icon.svg",
    label: "pages.settings.engines.engine_pubmed_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "semanticscholar",
    alt: "Semantic Scholar logo",
    icon: "",
    label: "pages.settings.engines.engine_semantic_scholar_science",
    safeSearch: false,
    timeRange: false,
  },

  {
    type: "divider",
    value: "",
    alt: "",
    icon: "",
    label: "pages.settings.engines.title_science3",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "wikispecies",
    alt: "Wikispecies logo",
    icon: "/assets/engines/wikispecies-icon.svg",
    label: "pages.settings.engines.engine_wikispecies",
    safeSearch: false,
    timeRange: false,
  },

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
    value: "openairedatasets",
    alt: "OpenAIRE logo",
    icon: "",
    label: "pages.settings.engines.engine_OA_datasets_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "openairepublications",
    alt: "OpenAIRE logo",
    icon: "",
    label: "pages.settings.engines.engine_OA_publications_science",
    safeSearch: false,
    timeRange: false,
  },
  {
    type: "engine",
    value: "pdbe",
    alt: "PDBe logo",
    icon: "/assets/engines/pdbe-icon.svg",
    label: "pages.settings.engines.engine_PDBe_science",
    safeSearch: false,
    timeRange: false,
  },
];
