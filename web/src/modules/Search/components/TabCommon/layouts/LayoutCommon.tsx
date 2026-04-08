import { Divider, Stack } from '@mantine/core';
import type { ICategories } from '@store/settings';
import React from 'react';
import RowCommon from '../components/RowCommon';
import SkeletonCommon from '../components/SkeletonCommon';
import type { ISearXNGResultsShared } from '@ts/searxng.types';
import PrivateMusicPlayer from '../../components/PrivatePlayer/music';

interface Props {
  tab: ICategories;
  data: ISearXNGResultsShared[];
  showSkeleton: boolean;
}

const LayoutCommon: React.FC<Props> = ({ tab, data, showSkeleton }) => {
  return (
    <>
      {data?.map((res, i) => {
        if (!res?.results) return null;

        return (
          <Stack gap='lg' key={i}>
            {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition='left' />}

            {res?.results.map((r, i2) => (
              <RowCommon key={i2} rowData={r} tab={tab} />
            ))}
          </Stack>
        );
      })}

      {showSkeleton &&
        // Loading state
        Array.from(Array(10).keys()).map((e, i) => <SkeletonCommon key={i} tab={tab} />)}

      {/* Private Video Player */}
      <PrivateMusicPlayer />
    </>
  );
};

export default LayoutCommon;
