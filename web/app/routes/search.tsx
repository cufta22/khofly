import PageSearch from '@module/Search';
import type { Route } from './+types/search';
import getSearXNGData from '../api/searxng/get-searxng-data';
import { type ISearXNGResultsShared } from '@ts/searxng.types';
import fs from 'node:fs';

export interface ILoaderData_Search {
  data: ISearXNGResultsShared | null;
  error: boolean;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Only SSR when not already on search pages
    if (request.headers.get('Referer')?.includes('/search')) {
      console.log('Returned from SSR loader');

      fs.appendFileSync(
        './SEARCH_LOADER_RETURNED.log',
        `${new Date().toISOString()} - Returned from SSR loader\n`,
      );

      return { data: null, error: false };
    }

    const data = await getSearXNGData(request);

    console.log(data);
    fs.appendFileSync('./SEARCH_LOADER_DATA.log', `${new Date().toISOString()} - ${data}\n`);

    return { data: data, error: false };
  } catch (err) {
    console.log('Catch error:');
    console.error(err);

    fs.appendFileSync('./SEARCH_LOADER_CATCH.log', `${new Date().toISOString()} - ${err}\n`);

    return { data: null, error: true };
  }
}

const Search = ({ loaderData }: Route.ComponentProps) => {
  return <PageSearch loaderData={loaderData} />;
};

export default Search;
