import { useInstanceStore } from "@store/instance";
import type { IWorkerTranslateResponse } from "../ai/types";
import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import useToast from "@hooks/use-toast";

interface Args {
  data: string;
  from: string;
  to: string;
}

const useTranslateSWR = () => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const workerDomain = useInstanceStore((state) => state.workerDomain);

  const fetcher = (_key: string, { arg }: { arg: Args }) => {
    const { data, from, to } = arg;

    return fetchData(
      `${workerDomain}?prompt=${data}&source_lang=${from}&target_lang=${to}&model=@cf/meta/m2m100-1.2b`,
      {
        method: "GET",
      }
    ) as Promise<IWorkerTranslateResponse>;
  };

  return useSWRMutation<IWorkerTranslateResponse, any, any, Args>(`api-translate`, fetcher, {
    // Error handling
    onError() {
      toast.show({
        title: "Something went wrong",
        message: "Unable to fetch translations",
        color: "red",
      });
    },
  });
};

export default useTranslateSWR;
