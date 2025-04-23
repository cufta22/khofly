import PageInstances from "@module/Instances";
import type { Route } from "./+types/instances";
import { INSTANCES_META_FUNCTION } from "app/meta/instances";

export interface ILoaderData_Instances {
  data: {
    instances: {
      name: string;
      url: string;
    }[];
  };
}

// Get instances info
export async function loader() {
  const apiUrl =
    process.env.IS_SELF_HOST === "1" ? process.env.API_URL_SELF_HOST : process.env.API_URL_EU1;

  const data = await fetch(`${apiUrl}/instances`);

  const instances = await data.json();

  return { data: instances };
}

// Meta tags
export const meta = INSTANCES_META_FUNCTION;

const Instances = ({ loaderData }: Route.ComponentProps) => {
  return <PageInstances loaderData={loaderData} />;
};

export default Instances;
