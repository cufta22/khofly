import PageIndex from "src/modules/Index";
import { Route } from "./+types/_index";

export interface ILoaderData_Index {
  nodeVersion: string;

  vercelRegion: string;

  flyAppName: string;
  flyRegion: string;
  flyMachineId: string;
}

// Get platform env data
export async function loader() {
  return {
    // Platform variables
    nodeVersion: typeof process !== "undefined" ? process?.versions?.node : "",
    // Vercel stuff
    vercelRegion: process.env.VERCEL_REGION || "",
    // Fly.io stuff
    flyAppName: process.env.FLY_APP_NAME || "",
    flyRegion: process.env.FLY_REGION || "",
    flyMachineId: process.env.FLY_MACHINE_ID || "",
    // Cloudflare stuff
    // TODO: add cf stuff like region, etc. from context
  };
}

const Index = ({ loaderData }: Route.ComponentProps) => {
  return <PageIndex loaderData={loaderData} />;
};

export default Index;
