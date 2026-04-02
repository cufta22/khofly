import { useInstanceStore } from '@store/instance';
import useFetch from '../use-fetch';
import type { IApiAIConfigResponse } from './types';
import useSWR from 'swr';
import useToast from '@hooks/use-toast';
import { useAIChatStore } from '@store/aichat';
import type { IAPIResponse } from '@ts/global.types';

const getKey = (domain: string) => {
  if (!domain) return null;

  return `api-ai-config`;
};

const useAIConfigSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const setConfig = useAIChatStore((state) => state.setConfig);

  const configUpdated = useAIChatStore((state) => state.configUpdated);
  const setConfigUpdated = useAIChatStore((state) => state.setConfigUpdated);

  const fetcher = (_key: string) => {
    return fetchData(`${apiDomain}/ai/config`, {
      method: 'GET',
    }) as Promise<IAPIResponse<IApiAIConfigResponse>>;
  };

  return useSWR<IAPIResponse<IApiAIConfigResponse>>(
    !configUpdated ? getKey(apiDomain) : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,

      onSuccess(data) {
        if (data?.data) {
          setConfig(data.data);
          setConfigUpdated(true);
        }
      },

      // Error handling
      onError() {
        toast.show({
          title: 'Something went wrong',
          message: 'Unable to fetch AI config',
          color: 'red',
        });
      },
    },
  );
};

export default useAIConfigSWR;
