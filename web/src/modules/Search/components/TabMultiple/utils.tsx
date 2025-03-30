import type { ICategories } from "@store/settings";
import GeneralRow from "../TabGeneral/components/GeneralRow";
import GeneralSkeleton from "../TabGeneral/components/GeneralSkeleton";
import ImageCell from "../TabImages/components/ImageCell";
import ImageSkeleton from "../TabImages/components/ImageSkeleton";
import VideoCell from "../TabVideos/components/VideoCell";
import VideoSkeleton from "../TabVideos/components/VideoSkeleton";
import NewsRow from "../TabNews/components/NewsRow";
import NewsSkeleton from "../TabNews/components/NewsSkeleton";
import MusicRow from "../TabMusic/components/MusicRow";
import MusicSkeleton from "../TabMusic/components/MusicSkeleton";
import ITRow from "../TabIT/components/ITRow";
import ITSkeleton from "../TabIT/components/ITSkeleton";
import ScienceRow from "../TabScience/components/ScienceRow";
import ScienceSkeleton from "../TabScience/components/ScienceSkeleton";
import FilesSkeleton from "../TabFiles/components/FilesSkeleton";
import FilesRow from "../TabFiles/components/FilesRow";
import SocialMediaRow from "../TabSocialMedia/components/SocialMediaRow";
import SocialMediaSkeleton from "../TabSocialMedia/components/SocialMediaSkeleton";

export const CATEGORY_TO_COMPONENTS: {
  [key in ICategories]: { row: React.FC<any>; skeleton: React.FC<any> };
} = {
  general: {
    row: GeneralRow,
    skeleton: GeneralSkeleton,
  },
  images: {
    row: ImageCell,
    skeleton: ImageSkeleton,
  },
  videos: {
    row: VideoCell,
    skeleton: VideoSkeleton,
  },
  news: {
    row: NewsRow,
    skeleton: NewsSkeleton,
  },
  music: {
    row: MusicRow,
    skeleton: MusicSkeleton,
  },
  it: {
    row: ITRow,
    skeleton: ITSkeleton,
  },
  science: {
    row: ScienceRow,
    skeleton: ScienceSkeleton,
  },
  files: {
    row: FilesRow,
    skeleton: FilesSkeleton,
  },
  social_media: {
    row: SocialMediaRow,
    skeleton: SocialMediaSkeleton,
  },

  // Unused
  maps: {
    row: () => <></>,
    skeleton: () => <></>,
  },
  other: {
    row: () => <></>,
    skeleton: () => <></>,
  },
};
