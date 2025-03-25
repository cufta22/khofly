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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeSettings: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslate();

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
      <Flex mt="xl" align="center" justify="space-between">
        <Text size="xl">Wallpapers</Text>

        <Button variant="subtle">Reset</Button>
      </Flex>

      <SimpleGrid cols={3} mt="md">
        <Flex className={classes.wallpaper_item} direction="column" align="center">
          <Image
            radius="md"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5054433.png&f=1&nofb=1&ipt=c844207fabb89a00a392f8c7ef3af4198a6646e0a291beb48b6c2e97bda672d6&ipo=images"
          />

          <Text mt="xs">A</Text>
        </Flex>

        <Flex className={classes.wallpaper_item} direction="column" align="center">
          <Image
            radius="md"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5054433.png&f=1&nofb=1&ipt=c844207fabb89a00a392f8c7ef3af4198a6646e0a291beb48b6c2e97bda672d6&ipo=images"
          />

          <Text mt="xs">A</Text>
        </Flex>

        <Flex className={classes.wallpaper_item} direction="column" align="center">
          <Image
            radius="md"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5054433.png&f=1&nofb=1&ipt=c844207fabb89a00a392f8c7ef3af4198a6646e0a291beb48b6c2e97bda672d6&ipo=images"
          />

          <Text mt="xs">A</Text>
        </Flex>
      </SimpleGrid>

      <Center my="xl">
        <RemixLink to="/settings">
          <Button variant="outline" rightSection={<IconChevronRight style={getIconStyle(18)} />}>
            Show more
          </Button>
        </RemixLink>
      </Center>
    </Drawer>
  );
};

export default CustomizeSettings;
