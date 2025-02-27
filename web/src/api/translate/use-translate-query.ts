import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";

interface Args {
  data: string;
  from: string;
  to: string;
}

const API_URL = "https://api-b2b.backenster.com/b1/api/v3";

const useDownloadSWR = () => {
  const { fetchData } = useFetch();

  // const searchParams = useSearchParams();
  // const q = (searchParams.get("q") as string) || "";

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    const { data, from, to } = arg;
    return fetchData(`${key}/translate`, {
      method: "POST",
      body: JSON.stringify({
        data,
        from,
        to,
        translateMode: "text",
        platform: "api",
      }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `${window.ENV.LINGVANEX_API_KEY}`,
        Authorization: "",
      },
    });
  };

  return useSWRMutation<{ result: string; err: string }, any, any, Args>(`${API_URL}`, fetcher, {});
};

export default useDownloadSWR;
