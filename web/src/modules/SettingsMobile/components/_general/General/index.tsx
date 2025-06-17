import { Divider, Paper, Stack, Tooltip, useMantineTheme } from "@mantine/core";

import {
  IconAppWindow,
  IconCursorText,
  IconExternalLink,
  IconFavicon,
  IconFlaskFilled,
  IconLayoutCollage,
  IconMessageCode,
  IconPlayerPlay,
  IconRadar,
  IconSettings2,
  IconShield,
} from "@tabler/icons-react";
import SettingsMTitle from "../../common/SettingsTitle";
import SettingsMRow from "../../common/SettingsMRow";
import NewTabSwitch from "@module/Settings/components/_general/General/NewTabSwitch";
import FaviconSwitch from "@module/Settings/components/_general/General/FaviconSwitch";
import AutocompleteSwitch from "@module/Settings/components/_general/General/AutocompleteSwitch";
import ShowEnginesSwitch from "@module/Settings/components/_general/General/ShowEnginesSwitch";
import MediaSwitch from "@module/Settings/components/_general/General/MediaSwitch";
import IASwitch from "@module/Settings/components/_general/General/IASwitch";
import PrivateSearchSwitch from "@module/Settings/components/_general/General/PrivateSearchSwitch";
import { IOpenSection } from "@module/SettingsMobile";

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMGeneral: React.FC<Props> = ({ handleChangeSection }) => {
  const theme = useMantineTheme();

  return (
    <>
      <SettingsMTitle
        title="pages.settings.general.title"
        handleChangeSection={handleChangeSection}
      />
      <Paper radius="md" withBorder>
        {/* Settings content */}
        <Stack w="100%" align="start" px="lg" my="xl">
          <SettingsMRow
            icon={<IconExternalLink color={theme.colors.gray["5"]} />}
            desc="pages.settings.interface.toggle_open_in_new_tab"
            control={<NewTabSwitch isM={true} />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.toggle_favicon"
            control={<FaviconSwitch isM={true} mDisplay="switch" />}
          />
          <SettingsMRow
            icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.favicon_provider"
            control={<FaviconSwitch isM={true} mDisplay="dropdown" />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconCursorText color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.toggle_autocomplete"
            control={<AutocompleteSwitch isM={true} mDisplay="switch" />}
          />
          <SettingsMRow
            icon={<IconCursorText color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.autocomplete_engine"
            control={<AutocompleteSwitch isM={true} mDisplay="dropdown" />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconRadar color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.show_engines"
            control={<ShowEnginesSwitch />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconLayoutCollage color={theme.colors.gray["5"]} />}
            desc="pages.settings.general.display_media"
            control={<MediaSwitch />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconMessageCode color={theme.colors.grape["5"]} />}
            desc="pages.settings.general.toggle_ia"
            control={<IASwitch />}
          />

          <Divider my="xs" w="100%" />

          <SettingsMRow
            icon={<IconShield color={theme.colors.green["5"]} />}
            desc="pages.settings.general.toggle_private_search"
            control={<PrivateSearchSwitch />}
          />
        </Stack>
      </Paper>
    </>
  );
};

export default SettingsMGeneral;
