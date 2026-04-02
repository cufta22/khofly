import { Divider, Paper, Stack, Tooltip, useMantineTheme } from '@mantine/core';

import {
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
  IconSpy,
} from '@tabler/icons-react';
import FaviconSwitch from './FaviconSwitch';
import AutocompleteSwitch from './AutocompleteSwitch';
import IASwitch from './IASwitch';
import PrivateSearchSwitch from './PrivateSearchSwitch';
import MediaSwitch from './MediaSwitch';
import ShowEnginesSwitch from './ShowEnginesSwitch';
import PrivatePlayerSwitch from './PrivarePlayerSwitch';
import SettingsRow from '../../common/SettingsRow';
import SettingsTitle from '../../common/SettingsTitle';
import SetDefaultButton from './SetDefaultButton';
import PrivateViewSwitch from './PrivateViewSwitch';
import MorePrivateViewOptions from './PrivateViewSwitch/MorePrivateViewOptions';
import NewTabSwitch from './NewTabSwitch';
import MoreIAOptions from './IASwitch/MoreIAOptions';

const SettingsGeneral = () => {
  const theme = useMantineTheme();

  return (
    <Paper radius='md' withBorder>
      <SettingsTitle
        icon={<IconSettings2 color={theme.colors[theme.primaryColor][5]} />}
        title='pages.settings.general.title'
      />

      {/* Settings content */}
      <Stack w='100%' align='start' px='lg' mb='xl'>
        <SettingsRow
          icon={<IconExternalLink color={theme.colors.gray['5']} />}
          desc='pages.settings.interface.toggle_open_in_new_tab'
          control={<NewTabSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconFavicon color={theme.colors.gray['5']} />}
          desc='pages.settings.general.toggle_favicon'
          control={<FaviconSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconCursorText color={theme.colors.gray['5']} />}
          desc='pages.settings.general.toggle_autocomplete'
          control={<AutocompleteSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconRadar color={theme.colors.gray['5']} />}
          desc='pages.settings.general.show_engines'
          control={<ShowEnginesSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconLayoutCollage color={theme.colors.gray['5']} />}
          desc='pages.settings.general.display_media'
          control={<MediaSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconMessageCode color={theme.colors.grape['5']} />}
          desc='pages.settings.general.toggle_ia'
          control={<IASwitch />}
        />
        <MoreIAOptions />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconShield color={theme.colors.green['5']} />}
          desc='pages.settings.general.toggle_private_search'
          control={<PrivateSearchSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconPlayerPlay color={theme.colors.orange['5']} />}
          desc='pages.settings.general.toggle_private_player'
          control={<PrivatePlayerSwitch />}
        />

        <Divider my='xs' w='100%' />

        <SettingsRow
          icon={<IconSpy color={theme.colors.indigo['5']} />}
          desc='pages.settings.general.toggle_private_view'
          tooltip={
            <Tooltip label='Experimental'>
              <IconFlaskFilled color={theme.colors.cyan['5']} />
            </Tooltip>
          }
          control={<PrivateViewSwitch />}
        />
        <MorePrivateViewOptions />

        <Divider my='xs' w='100%' />

        <SettingsRow
          // icon={null}
          desc='pages.settings.general.set_as_default'
          control={<SetDefaultButton />}
        />
      </Stack>
    </Paper>
  );
};

export default SettingsGeneral;
