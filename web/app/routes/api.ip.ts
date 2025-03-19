import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(request);

  const myIP = request.headers.get("x-real-ip") || request.headers.get("x-forwarder-for") || "";

  return new Response(myIP, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
