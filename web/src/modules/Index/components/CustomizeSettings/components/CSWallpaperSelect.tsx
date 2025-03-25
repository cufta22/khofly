import { Button, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import classes from "../styles.module.scss";
import { WALLPAPERS_CATPPUCCIN, WALLPAPERS_LANDSCAPE, WALLPAPERS_RETROWAVE } from "../data";
import type { Dispatch, SetStateAction } from "react";
import type { IWallpaperCategory } from "..";
import { useStatrpageStore } from "@store/startpage";

interface Props {
  setWpCategory: Dispatch<SetStateAction<IWallpaperCategory>>;
}

const CSWallpaperSelect: React.FC<Props> = ({ setWpCategory }) => {
  const setWallpaper = useStatrpageStore((state) => state.setWallpaper);

  return (
    <>
      <Flex mt="xl" align="center" justify="space-between">
        <Text size="xl">Wallpapers</Text>

        <Button variant="subtle" onClick={() => setWallpaper("")}>
          Reset
        </Button>
      </Flex>

      <SimpleGrid cols={3} mt="md">
        <Flex
          className={classes.wallpaper_item}
          onClick={() => setWpCategory("retrowave")}
          direction="column"
          align="center"
        >
          <Image radius="md" src={WALLPAPERS_RETROWAVE[0].src} />

          <Text mt="xs">Retrowave</Text>
        </Flex>

        <Flex
          className={classes.wallpaper_item}
          onClick={() => setWpCategory("landscape")}
          direction="column"
          align="center"
        >
          <Image radius="md" src={WALLPAPERS_LANDSCAPE[0].src} />

          <Text mt="xs">Landscape</Text>
        </Flex>

        <Flex
          className={classes.wallpaper_item}
          onClick={() => setWpCategory("catppuccin")}
          direction="column"
          align="center"
        >
          <Image radius="md" src={WALLPAPERS_CATPPUCCIN[0].src} />

          <Text mt="xs">Catppuccin</Text>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default CSWallpaperSelect;
