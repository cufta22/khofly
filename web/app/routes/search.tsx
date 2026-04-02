import PageSearch from '@module/Search';
import type { Route } from './+types/search';
import getSearXNGData from 'app/api/searxng/get-searxng-data';
import { type ISearXNGResultsShared } from '@ts/searxng.types';

export interface ILoaderData_Search {
  data: ISearXNGResultsShared | null;
  error: boolean;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Only SSR when not already on search pages
    if (request.headers.get('Referer')?.includes('/search')) return { data: null, error: false };

    const data = await getSearXNGData(request);

    return { data: data, error: false };
  } catch {
    return { data: null, error: true };
  }
}

const Search = ({ loaderData }: Route.ComponentProps) => {
  return <PageSearch loaderData={loaderData} />;
};

export default Search;
