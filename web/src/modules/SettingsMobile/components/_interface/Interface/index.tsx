import { Divider, Paper, Stack } from '@mantine/core';

import SettingsMTitle from '../../common/SettingsTitle';
import SettingsMRow from '../../common/SettingsMRow';
import type { IOpenSection } from '@module/SettingsMobile';
import LanguageSelect from '@module/Settings/components/_interface/Interface/LanguageSelect/LanguageSelect';
import ThemeSelect from '@module/Settings/components/_interface/Interface/ThemeSelect/ThemeSelect';
import PrimaryColorSelect from '@module/Settings/components/_interface/Interface/PrimaryColorSelect/PrimaryColorSelect';
import ColorSchemeSwitch from '@module/Settings/components/_interface/Interface/ColorThemeSwitch/ColorThemeSwitch';

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMInterface: React.FC<Props> = ({ handleChangeSection }) => {
  return (
    <>
      <SettingsMTitle
        title='pages.settings.interface.title'
        handleChangeSection={handleChangeSection}
      />
      <Paper radius='md' withBorder>
        {/* Settings content */}
        <Stack w='100%' align='start' px='lg' my='xl'>
          <SettingsMRow
            // icon={<IconExternalLink color={theme.colors.gray["5"]} />}
            desc='pages.settings.interface.select_lang'
            control={<LanguageSelect />}
          />

          <Divider my='xs' w='100%' />

          <SettingsMRow
            // icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc='pages.settings.interface.select_theme'
            control={<ThemeSelect />}
          />

          <Divider my='xs' w='100%' />

          <SettingsMRow
            // icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc='pages.settings.interface.select_primary_color'
            control={<PrimaryColorSelect />}
          />

          <Divider my='xs' w='100%' />

          <SettingsMRow
            // icon={<IconRadar color={theme.colors.gray["5"]} />}
            desc='pages.settings.interface.select_color'
            control={<ColorSchemeSwitch />}
          />
        </Stack>
      </Paper>
    </>
  );
};

export default SettingsMInterface;
