import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { platformJson } from "app/platform/json";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get("url") || "";

  if (!url) return {};

  const res = await fetch(url);

  const data = await res.json();

  return platformJson({ data });
};
