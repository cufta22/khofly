import {
  Accordion,
  Button,
  Center,
  Drawer,
  Flex,
  Image,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import { useState } from "react";
import CSWallpaperSelect from "./components/CSWallpaperSelect";
import CSWallpaperCategory from "./components/CSWallpaperCategory";
import CSShortcuts from "./components/CSShortcuts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export type IWallpaperCategory = "" | "retrowave" | "landscape" | "minecraft";

const CustomizeSettings: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslate();

  const [wpCategory, setWpCategory] = useState<IWallpaperCategory>("");

  return (
    <Drawer
      offset={8}
      size="lg"
      radius="md"
      opened={isOpen}
      onClose={onClose}
      title={
        <Flex align="center" gap="sm">
          <Text size="xl">Customize</Text>
        </Flex>
      }
      position="right"
      padding="xl"
      closeButtonProps={{
        size: "lg",
      }}
      classNames={{
        header: classes.drawer_header,
        content: classes.drawer_root,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {wpCategory === "" && <CSWallpaperSelect setWpCategory={setWpCategory} />}

      {["retrowave", "landscape", "minecraft"].includes(wpCategory) && (
        <CSWallpaperCategory wpCategory={wpCategory} setWpCategory={setWpCategory} />
      )}

      {wpCategory === "" && <CSShortcuts />}

      {wpCategory === "" && (
        <Center my="xl">
          <RemixLink to="/settings?tab=startpage">
            <Button variant="outline" rightSection={<IconChevronRight style={getIconStyle(18)} />}>
              Show more
            </Button>
          </RemixLink>
        </Center>
      )}
    </Drawer>
  );
};

export default CustomizeSettings;
