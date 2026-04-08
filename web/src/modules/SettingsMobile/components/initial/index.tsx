import { Flex, Paper, Stack, useMantineTheme } from '@mantine/core';
import type { IOpenSection } from '@module/SettingsMobile';
import React from 'react';
import SettingsMInitRow from '../common/SettingsMInitRow';
import {
  IconApiApp,
  IconBrush,
  IconCategory,
  IconPhoto,
  IconRadar,
  IconSearch,
  IconSettings2,
  IconWorld,
} from '@tabler/icons-react';

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMInitial: React.FC<Props> = ({ handleChangeSection }) => {
  const theme = useMantineTheme();

  return (
    <Stack w='100%' align='start'>
      <Paper w='100%' radius='md' mt='xl' withBorder>
        <Flex direction='column' gap='xl' py='lg'>
          <SettingsMInitRow
            icon={<IconSettings2 color={theme.colors.blue['5']} />}
            desc='pages.settings.general.title'
            onClick={() => {
              handleChangeSection('general');
            }}
          />
          {/* <SettingsMInitRow
            icon={<IconSparkles color={theme.colors.pink["5"]} />}
            desc="pages.settings.ai.title"
            onClick={() => {
              handleChangeSection("ai");
            }}
          /> */}
        </Flex>
      </Paper>

      <Paper w='100%' radius='md' mt='sm' withBorder>
        <Flex direction='column' gap='xl' py='lg'>
          <SettingsMInitRow
            icon={<IconCategory color={theme.colors.blue['5']} />}
            desc='pages.settings.categories.title'
            onClick={() => {
              handleChangeSection('categories');
            }}
          />
          <SettingsMInitRow
            icon={<IconBrush color={theme.colors.blue['5']} />}
            desc='pages.settings.interface.title'
            onClick={() => {
              handleChangeSection('interface');
            }}
          />
        </Flex>
      </Paper>

      <Paper w='100%' radius='md' mt='sm' withBorder>
        <Flex direction='column' gap='xl' py='lg'>
          <SettingsMInitRow
            icon={<IconSearch color={theme.colors.blue['5']} />}
            desc='pages.settings.instances.title_searxng'
            onClick={() => {
              handleChangeSection('searxng');
            }}
          />
          <SettingsMInitRow
            icon={<IconApiApp color={theme.colors.blue['5']} />}
            desc='pages.settings.instances.title_api'
            onClick={() => {
              handleChangeSection('api');
            }}
          />
          {/* <SettingsMInitRow
            icon={<IconBrandCloudflare color={theme.colors.orange["5"]} />}
            desc="pages.settings.instances.title_ai"
            onClick={() => {
              handleChangeSection("worker");
            }}
          /> */}
          <SettingsMInitRow
            icon={<IconWorld color={theme.colors.blue['5']} />}
            desc='pages.settings.instances.title_nominatim'
            onClick={() => {
              handleChangeSection('nominatim');
            }}
          />
        </Flex>
      </Paper>

      <Paper w='100%' radius='md' mt='sm' withBorder>
        <Flex direction='column' gap='xl' py='lg'>
          <SettingsMInitRow
            icon={<IconRadar color={theme.colors.blue['5']} />}
            desc='pages.settings._common.engines'
            onClick={() => {
              handleChangeSection('engines');
            }}
          />
        </Flex>
      </Paper>

      <Paper w='100%' radius='md' mt='sm' withBorder>
        <Flex direction='column' gap='xl' py='lg'>
          <SettingsMInitRow
            icon={<IconPhoto color={theme.colors.blue['5']} />}
            desc='pages.settings.homepage.title_background'
            onClick={() => {
              handleChangeSection('wallpaper');
            }}
          />
          {/* <SettingsMInitRow
            icon={<IconExternalLink color={theme.colors.blue["5"]} />}
            desc="pages.settings.homepage.title_shortcuts"
            onClick={() => {
              handleChangeSection("shortcuts");
            }}
          /> */}
        </Flex>
      </Paper>
    </Stack>
  );
};

export default SettingsMInitial;
