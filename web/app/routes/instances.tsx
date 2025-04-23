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
  const jsonUrl = "https://raw.githubusercontent.com/cufta22/khofly/staging/instances.json";

  const data = await fetch(jsonUrl);

  const instances = await data.json();

  return { data: instances };
}

// Meta tags
export const meta = INSTANCES_META_FUNCTION;

const Instances = ({ loaderData }: Route.ComponentProps) => {
  return <PageInstances loaderData={loaderData} />;
};

export default Instances;
