import type { ICategories } from '@store/settings';
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
  type IconProps,
} from '@tabler/icons-react';
import type { DotNestedKeys, ITranslations } from '@ts/global.types';

export const CATEGORIES_DATA: {
  [key in ICategories]: {
    title: DotNestedKeys<ITranslations>;
    icon: React.ForwardRefExoticComponent<IconProps>;
  };
} = {
  general: {
    title: '_common.category_general',
    icon: IconSearch,
  },
  images: {
    title: '_common.category_images',
    icon: IconPhoto,
  },
  videos: {
    title: '_common.category_videos',
    icon: IconPlayerPlay,
  },
  news: {
    title: '_common.category_news',
    icon: IconNews,
  },
  maps: {
    title: '_common.category_maps',
    icon: IconMapPin,
  },
  music: {
    title: '_common.category_music',
    icon: IconMusic,
  },
  it: {
    title: '_common.category_it',
    icon: IconCpu,
  },
  science: {
    title: '_common.category_science',
    icon: IconSchool,
  },
  files: {
    title: '_common.category_files',
    icon: IconFiles,
  },
  social_media: {
    title: '_common.category_social_media',
    icon: IconUsers,
  },

  // Unused
  other: {
    title: '_common.category_other',
    icon: IconSearch,
  },
};

const desiredOrder = [
  'general',
  'images',
  'videos',
  'news',
  'maps',
  'music',
  'it',
  'science',
  'files',
  'social_media',
];

export const sortCategories = (categories: ICategories[]) => {
  return categories.toSorted((a, b) => {
    return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
  });
};
