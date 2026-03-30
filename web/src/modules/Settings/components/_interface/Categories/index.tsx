import { Flex, Paper, Text, useMantineTheme } from "@mantine/core";
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
import { DotNestedKeys, ITranslations } from "@ts/global.types";
import { ElementType } from "react";

const CATEGORIES_DATA: {
  id: ICategories;
  title: DotNestedKeys<ITranslations>;
  icon: ElementType;
}[] = [
  { id: "general", title: "_common.category_general", icon: IconSearch },
  { id: "images", title: "_common.category_images", icon: IconPhoto },
  { id: "videos", title: "_common.category_videos", icon: IconPlayerPlay },
  { id: "news", title: "_common.category_news", icon: IconNews },
  { id: "maps", title: "_common.category_maps", icon: IconMapPin },
  { id: "music", title: "_common.category_music", icon: IconMusic },
  { id: "it", title: "_common.category_it", icon: IconCpu },
  { id: "science", title: "_common.category_science", icon: IconSchool },
  { id: "files", title: "_common.category_files", icon: IconFiles },
  { id: "social_media", title: "_common.category_social_media", icon: IconUsers },
];

const SettingsCategories = () => {
  const theme = useMantineTheme();

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
        icon={<IconCategory color={theme.colors.blue["5"]} />}
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
