import PageChangelog from "@module/Changelog";
import type { Route } from "./+types/changelog";
import { CHANGELOG_META_FUNCTION } from "app/meta/changelog";

export interface ILoaderData_Changelog {
  data: string;
}

// Get changelog info
export async function loader() {
  const envUrl =
    process.env.HOST === "https://khofly.com"
      ? "https://raw.githubusercontent.com/cufta22/khofly/refs/heads/master/CHANGELOG.md"
      : "https://raw.githubusercontent.com/cufta22/khofly/refs/heads/staging/CHANGELOG.md";
  const a = "https://raw.githubusercontent.com/cufta22/khofly/refs/heads/staging/instances.json";

  const data = await fetch(envUrl);

  const changelog = await data.text();

  return { data: changelog };
}

// Meta tags
export const meta = CHANGELOG_META_FUNCTION;

const Changelog = ({ loaderData }: Route.ComponentProps) => {
  return <PageChangelog loaderData={loaderData} />;
};

export default Changelog;
