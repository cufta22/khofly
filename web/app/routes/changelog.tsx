import PageChangelog from '@module/Changelog';
import type { Route } from './+types/changelog';
import { CHANGELOG_META_FUNCTION } from 'app/meta/changelog';

export interface ILoaderData_Changelog {
  data: string | null;
  error: boolean;
}

// Get changelog info
export async function loader() {
  try {
    const envUrl =
      process.env.HOST === 'https://khofly.com'
        ? 'https://raw.githubusercontent.com/cufta22/khofly/refs/heads/master/CHANGELOG.md'
        : 'https://raw.githubusercontent.com/cufta22/khofly/refs/heads/staging/CHANGELOG.md';

    const data = await fetch(envUrl);

    const changelog = await data.text();

    return { data: changelog, error: false };
  } catch (error) {
    return { data: null, error: true };
  }
}

// Meta tags
export const meta = CHANGELOG_META_FUNCTION;

const Changelog = ({ loaderData }: Route.ComponentProps) => {
  return <PageChangelog loaderData={loaderData} />;
};

export default Changelog;
