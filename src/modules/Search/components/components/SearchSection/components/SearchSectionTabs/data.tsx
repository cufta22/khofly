import { ICategories } from "@store/settings";
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
} from "@tabler/icons-react";

export const CATEGORIES_DATA = {
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
