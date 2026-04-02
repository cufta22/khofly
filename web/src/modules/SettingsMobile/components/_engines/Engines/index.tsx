import type { IOpenSection } from '@module/SettingsMobile';
import React, { useState } from 'react';
import SettingsMTitle from '../../common/SettingsTitle';
import { Paper, Select, Stack } from '@mantine/core';
import type { ICategories } from '@store/settings';
import SettingsMEnginesWrapper from './Wrapper';
import {
  DATA_ENGINES_FILES,
  DATA_ENGINES_GENERAL,
  DATA_ENGINES_IMAGES,
  DATA_ENGINES_IT,
  DATA_ENGINES_MUSIC,
  DATA_ENGINES_NEWS,
  DATA_ENGINES_OTHER,
  DATA_ENGINES_SCIENCE,
  DATA_ENGINES_SOCIAL_MEDIA,
  DATA_ENGINES_VIDEOS,
} from '@module/Settings/components/_engines/Engines/components/data';

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMEngines: React.FC<Props> = ({ handleChangeSection }) => {
  const [tab, setTab] = useState<ICategories>('general');

  const enginesData = {
    general: DATA_ENGINES_GENERAL,
    images: DATA_ENGINES_IMAGES,
    videos: DATA_ENGINES_VIDEOS,
    news: DATA_ENGINES_NEWS,
    music: DATA_ENGINES_MUSIC,
    it: DATA_ENGINES_IT,
    science: DATA_ENGINES_SCIENCE,
    files: DATA_ENGINES_FILES,
    social_media: DATA_ENGINES_SOCIAL_MEDIA,
    other: DATA_ENGINES_OTHER,

    // Not used
    maps: [],
  }[tab];

  return (
    <>
      <SettingsMTitle
        title='pages.settings._common.engines'
        handleChangeSection={handleChangeSection}
      />

      <Paper radius='md' withBorder>
        {/* Settings content */}
        <Stack w='100%' align='start' px='lg' my='xl'>
          <Select
            value={tab}
            onChange={(val) => val && setTab(val as ICategories)}
            data={[
              { label: 'General', value: 'general' },
              { label: 'Images', value: 'images' },
              { label: 'Videos', value: 'videos' },
              { label: 'News', value: 'news' },
              { label: 'Music', value: 'music' },
              { label: 'IT', value: 'it' },
              { label: 'Science', value: 'science' },
              { label: 'Files', value: 'files' },
              { label: 'Social Media', value: 'social_media' },
              { label: 'Other', value: 'other' },
            ]}
          />

          <SettingsMEnginesWrapper category={tab} data={enginesData} />
        </Stack>
      </Paper>
    </>
  );
};

export default SettingsMEngines;
