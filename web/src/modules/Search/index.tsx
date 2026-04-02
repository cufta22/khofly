import { lazy } from 'react';
import { useSearchParams } from 'react-router';
import TabCommon from './components/TabCommon';
import { type ICategories } from '@store/settings';
import { type ILoaderData_Search } from 'app/routes/search';
import { notifications } from '@mantine/notifications';

const TabMapsWithoutSSR = lazy(() => import('./components/TabMaps'));

interface Props {
  loaderData: ILoaderData_Search;
}

const PageSearch: React.FC<Props> = ({ loaderData }) => {
  const [searchParams] = useSearchParams();

  const tab = searchParams.get('tab') || 'general';

  if (loaderData.error) {
    notifications.show({
      title: 'Something went wrong',
      message: 'Failed to load SSR results',
      color: 'red',
    });
  }

  if (tab === 'maps') {
    return <TabMapsWithoutSSR />;
  } else {
    return <TabCommon tab={tab as ICategories} loaderData={loaderData} />;
  }
};

export default PageSearch;
