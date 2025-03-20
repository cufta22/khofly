import type { ICategories } from "@store/settings";

export const getTabFromQuery = (q: string): { tab: ICategories | "" } => {
  let tab: ICategories | "" = "";

  if (q.includes("!general")) tab = "general";
  if (q.includes("!images")) tab = "images";
  if (q.includes("!videos")) tab = "videos";
  if (q.includes("!news")) tab = "news";
  if (q.includes("!maps")) tab = "maps";
  if (q.includes("!music")) tab = "music";
  if (q.includes("!it")) tab = "it";
  if (q.includes("!science")) tab = "science";
  if (q.includes("!files")) tab = "files";
  if (q.includes("!social_media")) tab = "social_media";

  return {
    tab,
  };
};
