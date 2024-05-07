import {
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
import NewTabSwitch from "@module/Settings/components/Interface/NewTabSwitch";
import FaviconSwitch from "@module/Settings/components/General/FaviconSwitch";
import { useTranslate } from "@hooks/translate/use-translate";
import ShowEnginesSwitch from "@module/Settings/components/General/ShowEnginesSwitch";
import ColorSchemeSwitch from "@module/Settings/components/Interface/ColorThemeSwitch/ColorThemeSwitch";
import ThemeSelect from "@module/Settings/components/Interface/ThemeSelect/ThemeSelect";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import LanguageSelect from "@module/Settings/components/Interface/LanguageSelect/LanguageSelect";
import MediaSwitch from "@module/Settings/components/General/MediaSwitch";
import IASwitch from "@module/Settings/components/General/IASwitch";
import PrivateSearchSwitch from "@module/Settings/components/General/PrivateSearchSwitch";

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
      <Stack className={classes.stact}>
        <Flex align="center" gap="sm" mb="lg">
          <IconSettings2 />

          <Text size="lg">{t("pages.settings.general.title")}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.general.toggle_favicon")}</Text>

          <FaviconSwitch />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.general.show_engines")}</Text>

          <ShowEnginesSwitch />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.general.display_media")}</Text>

          <MediaSwitch />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.general.toggle_ia")}</Text>

          <IASwitch />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.general.toggle_private_search")}</Text>

          <PrivateSearchSwitch />
        </Flex>
      </Stack>

      <Stack className={classes.stact} mt="lg">
        <Flex align="center" gap="sm" mb="lg">
          <IconBrush />

          <Text size="lg">{t("pages.settings.interface.title")}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.interface.select_lang")}</Text>

          <LanguageSelect />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.interface.select_theme")}</Text>

          <ThemeSelect />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.interface.select_color")}</Text>

          <ColorSchemeSwitch />
        </Flex>

        <Divider my={6} w="100%" />

        <Flex align="center" justify="space-between">
          <Text>{t("pages.settings.interface.toggle_open_in_new_tab")}</Text>

          <NewTabSwitch />
        </Flex>
      </Stack>

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
