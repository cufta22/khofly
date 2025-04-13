import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import type { IWorkerTextGenResponse } from "./types";
import useSWR from "swr";
import useToast from "@hooks/use-toast";
import { profanityFilter } from "@utils/functions/profanityFilter";

interface Args {
  prompt: any;
}

const getKey = (domain: string, model?: string) => {
  if (!domain) return null;

  return `api-ai-${domain}-${model}`;
};

const useAIAnswerSWR = (args: Args) => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const workerModel = useInstanceStore((state) => state.workerModel);

  const fetcher = (_key: string) => {
    // Cloudflare AI Worker
    return fetchData(`${workerDomain}`, {
      method: "POST",
      body: JSON.stringify({
        prompt: `give me a short answer to the following question:  ${profanityFilter(
          args?.prompt
        )}`,
        model: workerModel,
        messages: [],
        max_tokens: 512,
        temperature: 0.2,
      }),
    }) as Promise<IWorkerTextGenResponse>;
  };

  return useSWR<IWorkerTextGenResponse>(getKey(workerDomain, workerModel), fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,

    // Error handling
    onError() {
      toast.show({
        title: "Something went wrong",
        message: "Unable to fetch AI response",
        color: "red",
      });
    },
  });
};

export default useAIAnswerSWR;
