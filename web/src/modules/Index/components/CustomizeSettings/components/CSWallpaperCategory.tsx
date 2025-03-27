import { Button, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import type { IWallpaperCategory } from "..";
import { WALLPAPERS_MINECRAFT, WALLPAPERS_LANDSCAPE, WALLPAPERS_RETROWAVE } from "../data";
import type { Dispatch, SetStateAction } from "react";
import classes from "../styles.module.scss";
import { useStatrpageStore } from "@store/startpage";

interface Props {
  wpCategory: IWallpaperCategory;
  setWpCategory: Dispatch<SetStateAction<IWallpaperCategory>>;
}

const CSWallpaperCategory: React.FC<Props> = ({ wpCategory, setWpCategory }) => {
  const setWallpaper = useStatrpageStore((state) => state.setWallpaper);

  const WP_DATA = {
    "": [],
    retrowave: WALLPAPERS_RETROWAVE,
    landscape: WALLPAPERS_LANDSCAPE,
    minecraft: WALLPAPERS_MINECRAFT,
  }[wpCategory];

  const categoryLabel = {
    "": "",
    retrowave: "Retrowave",
    landscape: "Landscape",
    minecraft: "Minecraft",
  }[wpCategory];

  return (
    <>
      <Flex mt="xl" align="center" justify="space-between">
        <Text size="xl">{categoryLabel}</Text>

        <Button variant="subtle" onClick={() => setWpCategory("")}>
          Back
        </Button>
      </Flex>

      <SimpleGrid cols={3} mt="md">
        {WP_DATA.map((item) => (
          <Flex
            key={item.src}
            onClick={() => setWallpaper(item.src)}
            className={classes.wallpaper_item}
            direction="column"
            align="center"
          >
            <Image radius="md" src={item.src} />
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CSWallpaperCategory;
