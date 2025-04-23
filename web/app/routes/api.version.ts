import type { LoaderFunctionArgs } from "react-router";
import packageJson from "../../package.json";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return new Response(JSON.stringify({ version: packageJson.version }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
