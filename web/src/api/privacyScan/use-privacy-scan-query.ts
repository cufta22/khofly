import { useInstanceStore } from '@store/instance';
import useFetch from '../use-fetch';
import useSWRMutation from 'swr/mutation';
import type { IAPIResponse } from '@ts/global.types';
import type { PrivacyScanResponse } from './types';
import useToast from '@hooks/use-toast';

interface Args {
  url: string;
}

const usePrivacyScanSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  const fetcher = (_key: string, { arg }: { arg: Args }) => {
    const { url } = arg;

    return fetchData(`${apiDomain}/privacy-scan?url=${url}`, {
      method: 'GET',
    }) as Promise<IAPIResponse<PrivacyScanResponse>>;
  };

  return useSWRMutation<IAPIResponse<PrivacyScanResponse>, any, any, Args>(
    `api-privacy-scan`,
    fetcher,
    {
      // Error handling
      onSuccess(res) {
        if (res?.error) {
          toast.show({ title: 'Something went wrong', message: res?.message, color: 'red' });
        }
      },
      onError() {
        toast.show({
          title: 'Something went wrong',
          message: 'Unable to scan website',
          color: 'red',
        });
      },
    },
  );
};

export default usePrivacyScanSWR;
