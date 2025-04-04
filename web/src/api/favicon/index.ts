import { useInstanceStore } from "@store/instance";
import { type IFaviconAPI, useSettingsStore } from "@store/settings";

export const useFaviconAPI = () => {
  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);
  const faviconProvider = useSettingsStore((state) => state.faviconProvider);

  const getFaviconUrl = (url: string, provider?: IFaviconAPI) =>
    `${apiDomain}/favicon?url=${url}&provider=${provider || faviconProvider}`;

  return { displayFavicon, getFaviconUrl };
};
