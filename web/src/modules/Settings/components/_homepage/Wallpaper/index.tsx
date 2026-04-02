import { Button, Flex, Paper, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';

import { IconDevices, IconPhoto } from '@tabler/icons-react';

import classes from '../../../styles.module.scss';

import { useHomepageStore } from '@store/homepage';
import SettingsTitle from '../../common/SettingsTitle';
import useForm from '@hooks/use-form';
import useToast from '@hooks/use-toast';
import { usePrimaryColor } from '@hooks/use-primary-color';
import { useEffect } from 'react';
import type { IOpenSection } from '@module/SettingsMobile';
import SettingsMTitle from '@module/SettingsMobile/components/common/SettingsTitle';
import { useTranslate } from '@hooks/translate/use-translate';

interface Props {
  isM?: boolean;
  handleChangeSection?: (next: IOpenSection) => void;
}

const SettingsWallpaper: React.FC<Props> = ({ isM, handleChangeSection }) => {
  const t = useTranslate();
  const theme = useMantineTheme();

  const background = useHomepageStore((state) => state.wallpaper);
  const setBackground = useHomepageStore((state) => state.setWallpaper);

  const form = useForm({
    initialValues: {
      background: '',
    },
    validate: {
      background: (value) =>
        /^(ftp|http|https):\/\/[^ "]+$/.test(value) || value.length === 0 ? null : 'Invalid URL',
    },
  });

  const { toast } = useToast();

  const linkTextColor = usePrimaryColor(4);

  const handleSubmit = (values: typeof form.values) => {
    setBackground(values.background);
    toast.show({ message: 'URL changed', color: 'green' });
  };

  useEffect(() => {
    form.setFieldValue('background', background);
  }, [background]);

  return (
    <>
      {isM && handleChangeSection && (
        <SettingsMTitle
          title='pages.settings.homepage.title_background'
          handleChangeSection={handleChangeSection}
        />
      )}

      <Paper radius='md' withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isM && (
            <SettingsTitle
              icon={<IconPhoto color={theme.colors[theme.primaryColor][5]} />}
              title='pages.settings.homepage.title_background'
              rightSection={
                <Flex className='desktop_only' align='center'>
                  <IconDevices />

                  <Text ml='sm'>{t('pages.settings._common.desktop_mobile')}</Text>
                </Flex>
              }
            />
          )}

          {/* Settings content */}
          <Stack w='100%' align='start' px='lg' mb='xl' mt={isM ? 'xl' : 0}>
            {/* <SettingsRow
          // icon={null}
          desc="pages.settings.homepage.toggle_shortcuts"
          control={<ShortcutsSwitch />}
        />

        <Divider my="sm" w="100%" /> */}

            <TextInput
              label={t('pages.settings.homepage.wallpaper_url')}
              placeholder='https://example.com'
              size='md'
              className={classes.settings_input}
              {...form.getInputProps('background')}
            />
          </Stack>

          <Flex
            align='center'
            justify='space-between'
            py='sm'
            px='lg'
            className={classes.settings_footer}
          >
            <div />

            <Button type='submit'>{t('pages.settings._common.save')}</Button>
          </Flex>
        </form>
      </Paper>
    </>
  );
};

export default SettingsWallpaper;
