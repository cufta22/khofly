import { Flex, Paper, Text } from "@mantine/core";
import {
  IconCategory,
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
import { CategoryCheckbox } from "./components/CategoryCheckbox";
import { type ICategories, useSettingsStore } from "@store/settings";
import SettingsTitle from "../../common/SettingsTitle";

const CATEGORIES_DATA = [
  { id: "general", title: "General", icon: IconSearch },
  { id: "images", title: "Images", icon: IconPhoto },
  { id: "videos", title: "Videos", icon: IconPlayerPlay },
  { id: "news", title: "News", icon: IconNews },
  { id: "maps", title: "Maps", icon: IconMapPin },
  { id: "music", title: "Music", icon: IconMusic },
  { id: "it", title: "IT", icon: IconCpu },
  { id: "science", title: "Science", icon: IconSchool },
  { id: "files", title: "Files", icon: IconFiles },
  { id: "social_media", title: "Social Media", icon: IconUsers },
];

const SettingsCategories = () => {
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
    <Paper radius="md" withBorder>
      <SettingsTitle
        icon={<IconCategory />}
        title="pages.settings.categories.title"
        rightSection={<Text>Currently enabled search categories</Text>}
      />

      {/* Settings content */}
      <Flex align="center" gap={4} px="lg" mb="xl" wrap="wrap">
        {items}
      </Flex>
    </Paper>
  );
};

export default SettingsCategories;
