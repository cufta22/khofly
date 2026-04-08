import { SimpleGrid } from '@mantine/core';
import type { ICategories } from '@store/settings';
import type { ISearXNGResultsVideos } from '@ts/searxng.types';
import SkeletonVideo from '../components/SkeletonVideo';
import CellVideo from '../components/CellVideo';
import PrivateVideoPlayer from '../../components/PrivatePlayer/videos';

interface Props {
  tab: ICategories;
  data: ISearXNGResultsVideos[];
  showSkeleton: boolean;
}

const LayoutVideos: React.FC<Props> = ({ data, showSkeleton }) => {
  return (
    <>
      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
        p='lg'
      >
        {data?.map((res) => {
          if (!res) return null;

          return res?.results.map((vid, i) => <CellVideo key={i} rowData={vid} />);
        })}

        {showSkeleton &&
          // Loading state
          Array.from(Array(30).keys()).map((e, i) => <SkeletonVideo key={i} />)}
      </SimpleGrid>

      {/* Private Video Player */}
      <PrivateVideoPlayer />
    </>
  );
};

export default LayoutVideos;
