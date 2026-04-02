import { useInstanceStore } from '@store/instance';
import { type IFaviconAPI, useSettingsStore } from '@store/settings';

export const useFaviconAPI = () => {
  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const favicon = useSettingsStore((state) => state.favicon);

  const getFaviconUrl = (url: string, provider?: IFaviconAPI) =>
    `${apiDomain}/favicon?url=${url}&provider=${provider || favicon.provider}`;

  return { displayFavicon: favicon.enabled, getFaviconUrl };
};
