import type { ICategories } from "@store/settings";
import GeneralRow from "../TabGeneral/components/GeneralRow";
import ImageCellMultiple from "../TabImages/components/ImageCellMultiple";
import VideoCellMultiple from "../TabVideos/components/VideoCellMultiple";
import NewsRow from "../TabNews/components/NewsRow";
import MusicRow from "../TabMusic/components/MusicRow";
import ITRow from "../TabIT/components/ITRow";
import ScienceRow from "../TabScience/components/ScienceRow";
import FilesRow from "../TabFiles/components/FilesRow";
import SocialMediaRow from "../TabSocialMedia/components/SocialMediaRow";

export const CATEGORY_TO_COMPONENTS: {
  [key in ICategories]: React.FC<any>;
} = {
  general: GeneralRow,
  images: ImageCellMultiple,
  videos: VideoCellMultiple,
  news: NewsRow,
  music: MusicRow,
  it: ITRow,
  science: ScienceRow,
  files: FilesRow,
  social_media: SocialMediaRow,

  // Unused
  maps: () => <></>,
  other: () => <></>,
};
