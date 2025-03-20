import type { ICategories } from "@store/settings";
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
} from "@tabler/icons-react";

export const CATEGORIES_DATA: {
  [key in ICategories]: { title: string; icon: React.ForwardRefExoticComponent<IconProps> };
} = {
  general: {
    title: "General",
    icon: IconSearch,
  },
  images: {
    title: "Images",
    icon: IconPhoto,
  },
  videos: {
    title: "Videos",
    icon: IconPlayerPlay,
  },
  news: {
    title: "News",
    icon: IconNews,
  },
  maps: {
    title: "Maps",
    icon: IconMapPin,
  },
  music: {
    title: "Music",
    icon: IconMusic,
  },
  it: {
    title: "IT",
    icon: IconCpu,
  },
  science: {
    title: "Science",
    icon: IconSchool,
  },
  files: {
    title: "Files",
    icon: IconFiles,
  },
  social_media: {
    title: "Social Media",
    icon: IconUsers,
  },

  // Unused
  other: {
    title: "Other",
    icon: IconSearch,
  },
};

const desiredOrder = [
  "general",
  "images",
  "videos",
  "news",
  "maps",
  "music",
  "it",
  "science",
  "files",
  "social_media",
];

export const sortCategories = (categories: ICategories[]) => {
  return categories.sort((a, b) => {
    return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
  });
};
