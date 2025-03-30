import type { DotNestedKeys, ITranslations } from "@ts/global.types";

export * from "./general";
export * from "./images";
export * from "./videos";
export * from "./news";
export * from "./music";
export * from "./it";
export * from "./files";
export * from "./science";
export * from "./social_media";
export * from "./other";

export interface IDataEngine {
  type: "divider" | "engine";
  value: string | "";
  alt: string;
  icon: string;
  label: DotNestedKeys<ITranslations>;
  bang: string;
  safeSearch: boolean;
  timeRange: boolean;
}
