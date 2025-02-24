import PageChangelog from "@module/Changelog";
import type { Route } from "./+types/changelog";

export interface ILoaderData_Changelog {
  data: string;
}

// Get changelog info
export async function loader() {
  const envUrl =
    process.env.NODE_ENV === "production"
      ? "https://raw.githubusercontent.com/cufta22/khofly/master/CHANGELOG.md"
      : "https://raw.githubusercontent.com/cufta22/khofly/staging/CHANGELOG.md";

  const data = await fetch(envUrl);

  const changelog = await data.text();

  return { data: changelog };
}

const Changelog = ({ loaderData }: Route.ComponentProps) => {
  return <PageChangelog loaderData={loaderData} />;
};

export default Changelog;
