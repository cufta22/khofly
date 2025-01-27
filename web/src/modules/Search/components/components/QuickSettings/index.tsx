import {
  Accordion,
  Button,
  Center,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrush,
  IconChevronRight,
  IconSettings2,
} from "@tabler/icons-react";
import classes from "./styles.module.scss";
import FaviconSwitch from "@module/Settings/components/General/FaviconSwitch";
import { useTranslate } from "@hooks/translate/use-translate";
import ShowEnginesSwitch from "@module/Settings/components/General/ShowEnginesSwitch";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import MediaSwitch from "@module/Settings/components/General/MediaSwitch";
import IASwitch from "@module/Settings/components/General/IASwitch";
import PrivateSearchSwitch from "@module/Settings/components/General/PrivateSearchSwitch";
import QSInterface from "./components/QSInterface";
import QSGeneral from "./components/QSGeneral";
import QSEngines from "./components/QSEngines";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSettings: React.FC<Props> = ({ isOpen, onClose }) => {
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
          <Text size="xl">Quick settings</Text>
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
      <Accordion defaultValue="general">
        <QSGeneral />

        <QSInterface />

        <QSEngines />
      </Accordion>

      <Center my="xl">
        <RemixLink to="/settings">
          <Button
            variant="outline"
            rightSection={<IconChevronRight style={getIconStyle(18)} />}
          >
            Show more
          </Button>
        </RemixLink>
      </Center>
    </Drawer>
  );
};

export default QuickSettings;
