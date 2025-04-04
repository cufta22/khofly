import { useInstanceStore } from "@store/instance";
import useFetch from "../use-fetch";
import useSWRMutation from "swr/mutation";
import type { IAPIResponse } from "@ts/global.types";
import { jsFileDownload } from "@utils/functions/jsFileDownload";
import useToast from "@hooks/use-toast";

interface Args {
  url: string;
  from: "youtube" | "instagram" | "tiktok";
  format: "mp3" | "mp4";
}

interface ResData {
  url: string;
  filename: string;
}

const useDownloadSWR = ({ shouldDownload }: { shouldDownload: boolean }) => {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const apiUrl = useInstanceStore((state) => state.apiDomain);

  const fetcher = (key: string, { arg }: { arg: Args }) => {
    // return fetchData(`${domain}/search?q=${arg}&format=jsonv2`) as Promise<INominatimResults[]>;

    return fetchData(
      `${apiUrl}/download?url=${arg.url}&from=${arg.from}&format=${arg.format}`
    ) as Promise<IAPIResponse<ResData>>;
  };

  return useSWRMutation<IAPIResponse<ResData>, any, any, Args>("api-download", fetcher, {
    onSuccess(res) {
      if (res?.error) {
        toast.show({ title: "Something went wrong", message: res.message, color: "red" });
        return;
      }

      if (!res?.data?.url) return;

      // Download file on success
      if (shouldDownload) {
        jsFileDownload({
          text: "",
          url: res?.data?.url,
          filename: res?.data?.filename,
        });
      }
    },
    onError(err) {
      toast.show({ title: "Something went wrong", message: "Download failed", color: "red" });
    },
  });
};

export default useDownloadSWR;
