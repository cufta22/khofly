import { Flex, Paper, SimpleGrid, Text, useMantineTheme } from '@mantine/core';
import {
  IconCpu,
  IconFiles,
  IconMapPin,
  IconMusic,
  IconNews,
  IconPhoto,
  IconPlayerPlay,
  IconSchool,
  IconSearch,
  IconUsers,
} from '@tabler/icons-react';
import { type ICategories, useSettingsStore } from '@store/settings';
import SettingsMTitle from '../../common/SettingsTitle';
import type { IOpenSection } from '@module/SettingsMobile';
import React from 'react';
import { CategoryCheckbox } from '@module/Settings/components/_interface/Categories/components/CategoryCheckbox';

const CATEGORIES_DATA = [
  { id: 'general', title: 'General', icon: IconSearch },
  { id: 'images', title: 'Images', icon: IconPhoto },
  { id: 'videos', title: 'Videos', icon: IconPlayerPlay },
  { id: 'news', title: 'News', icon: IconNews },
  { id: 'maps', title: 'Maps', icon: IconMapPin },
  { id: 'music', title: 'Music', icon: IconMusic },
  { id: 'it', title: 'IT', icon: IconCpu },
  { id: 'science', title: 'Science', icon: IconSchool },
  { id: 'files', title: 'Files', icon: IconFiles },
  { id: 'social_media', title: 'Social Media', icon: IconUsers },
];

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMCategories: React.FC<Props> = ({ handleChangeSection }) => {
  const categories = useSettingsStore((state) => state.categories);
  const setCategories = useSettingsStore((state) => state.setCategories);

  const handleChangeCategories = (next: boolean, id: ICategories) => {
    let newCategories = [];

    if (next) {
      newCategories = [...categories, id];
    } else {
      newCategories = categories.filter((eng) => eng !== id);
    }

    setCategories(newCategories);
  };

  const items = CATEGORIES_DATA.map((item) => (
    <CategoryCheckbox
      {...item}
      checked={categories?.includes(item.id as ICategories)}
      onChange={handleChangeCategories}
      key={item.title}
    />
  ));

  return (
    <>
      <SettingsMTitle
        handleChangeSection={handleChangeSection}
        title='pages.settings.categories.title'
      />

      <Paper radius='md' withBorder>
        {/* Settings content */}
        {/* <Flex align="center" gap={4} px="lg" mb="xl" wrap="wrap"> */}
        <SimpleGrid p='lg' cols={2}>
          {items}
        </SimpleGrid>
        {/* </Flex> */}
      </Paper>
    </>
  );
};

export default SettingsMCategories;
