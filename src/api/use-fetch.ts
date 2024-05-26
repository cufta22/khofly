import useToast from "@hooks/use-toast";

const useFetch = () => {
  const { toast } = useToast();

  const fetchData = async (url: string, init?: RequestInit) => {
    const res = await fetch(url, init).catch(() => {
      toast.show({
        title: "Something went wrong!",
        message: "An error has occurred while processing the request",
        color: "red",
      });
    });

    if (!res) return;

    const contentType = res.headers.get("content-type")!;
    let resData = undefined;

    if (contentType?.startsWith("application/json")) resData = await res.json();
    if (contentType?.startsWith("text/")) resData = await res.text();

    return resData;
  };

  return { fetchData };
};
export default useFetch;
