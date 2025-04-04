const useFetch = () => {
  const fetchData = async (url: string, init?: RequestInit) => {
    const res = await fetch(url, init).catch(() => {});

    if (!res) return;

    const contentType = res.headers.get("content-type");
    let resData = undefined;

    if (contentType?.startsWith("application/json")) resData = await res.json();
    if (contentType?.startsWith("text/")) resData = await res.text();

    return resData;
  };

  return { fetchData };
};
export default useFetch;
