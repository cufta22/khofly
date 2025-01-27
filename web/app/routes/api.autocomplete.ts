import { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q");
  const autocompleteEngine = searchParams.get("engine") as "duckduckgo" | "google" | "brave";

  const autocompleteUrl = {
    google: `https://www.google.com/complete/search?q=${q}&client=firefox`,
    duckduckgo: `https://duckduckgo.com/ac/?q=${q}&type=list`,
    brave: `https://search.brave.com/api/suggest?q=${q}`,
    qwant: `https://api.qwant.com/v3/suggest?q=${q}&version=2`,
  }[autocompleteEngine || "duckduckgo"];

  const res = await fetch(autocompleteUrl);

  const data = await res.json();

  let formattedData = [];

  if (["duckduckgo", "google", "brave"].includes(autocompleteEngine)) {
    formattedData = data?.[1]?.slice(0, 5) || [];
  }

  if (["qwant"].includes(autocompleteEngine)) {
    formattedData = data?.data?.items?.map((item: { value: string }) => item.value)?.slice(0, 5) || [];
  }

  return new Response(JSON.stringify(formattedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
