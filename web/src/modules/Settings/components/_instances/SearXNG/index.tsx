import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  type SelectProps,
} from '@mantine/core';

import classes from '../../../styles.module.scss';
import { getIconStyle } from '@utils/functions/iconStyle';
import useToast from '@hooks/use-toast';
import RemixLink from '@components/RemixLink';
import { useInstanceStore } from '@store/instance';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { DEFlag } from '@components/Icons';
import useForm from '@hooks/use-form';
import { usePrimaryColor } from '@hooks/use-primary-color';
import { IS_SELF_HOST } from '@utils/resources/isSelfHost';
import SettingsTitle from '../../common/SettingsTitle';
import type { IOpenSection } from '@module/SettingsMobile';
import SettingsMTitle from '@module/SettingsMobile/components/common/SettingsTitle';
import { useTranslate } from '@hooks/translate/use-translate';

interface Props {
  isM?: boolean;
  handleChangeSection?: (next: IOpenSection) => void;
}

const SettingsSearXNG: React.FC<Props> = ({ isM, handleChangeSection }) => {
  const t = useTranslate();
  const theme = useMantineTheme();

  const domain = useInstanceStore((state) => state.searXNGDomain);
  const setDomain = useInstanceStore((state) => state.setSearXNGDomain);

  const form = useForm({
    initialValues: {
      domain: '',
      select: '',
    },
    validate: {
      domain: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid URL'),
    },
  });

  const { toast } = useToast();

  const linkTextColor = usePrimaryColor(4);

  const handleSubmit = (values: typeof form.values) => {
    setDomain(values.domain);
    toast.show({ message: 'URL changed', color: 'green' });
  };

  useEffect(() => {
    form.setFieldValue('domain', domain);

    if ([process.env.SEARXNG_URL_EU1, process.env.SEARXNG_URL_US1].includes(domain)) {
      form.setFieldValue('select', domain);
    }
  }, [domain]);

  const icons: Record<string, React.ReactNode> = {
    [process.env.SEARXNG_URL_EU1 || '']: <DEFlag style={getIconStyle(20)} />,
    // [process.env.SEARXNG_URL_US1]: <USFlag style={getIconStyle(20)} />,
  };

  const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
    <Group flex='1' gap='xs'>
      {icons[option.value]}
      {option.label}
    </Group>
  );

  return (
    <>
      {isM && handleChangeSection && (
        <SettingsMTitle
          title='pages.settings.instances.title_searxng'
          handleChangeSection={handleChangeSection}
        />
      )}

      <Paper radius='md' withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isM && (
            <SettingsTitle
              icon={<IconSearch color={theme.colors.blue['5']} />}
              title='pages.settings.instances.title_searxng'
            />
          )}

          {/* Settings content */}
          <Stack px='lg' mb='xl' mt={isM ? 'lg' : 0}>
            <TextInput
              placeholder='https://example.com'
              size='md'
              className={classes.settings_input}
              {...form.getInputProps('domain')}
            />

            {!IS_SELF_HOST && (
              <Select
                className={classes.settings_select}
                label={t('pages.settings.instances.default_instances')}
                description={t('pages.settings.instances.pick_one')}
                placeholder={t('pages.settings.instances.instance_location')}
                value={form.values.select}
                onChange={(val) => {
                  form.setFieldValue('select', val || '');
                  form.setFieldValue('domain', val || '');
                }}
                data={[
                  {
                    label: 'Nuremberg, Germany',
                    value: process.env.SEARXNG_URL_EU1 || '1',
                  },
                  // {
                  //   label: "Ashburn, USA",
                  //   value: process.env.SEARXNG_URL_US1 || "2",
                  // },
                ]}
                renderOption={renderSelectOption}
                leftSection={icons[form.values.select]}
              />
            )}
          </Stack>

          <Flex
            align='center'
            justify='space-between'
            py='sm'
            px='lg'
            className={classes.settings_footer}
          >
            <Text size='sm' c='dimmed'>
              {t('pages.settings.instances.change_url')}{' '}
              <Text component='span' c={linkTextColor}>
                <RemixLink to={'/docs/self-host-searxng'}>{t('_common.read_more')}</RemixLink>
              </Text>
            </Text>

            <Button type='submit'>{t('pages.settings._common.save')}</Button>
          </Flex>
        </form>
      </Paper>
    </>
  );
};

export default SettingsSearXNG;
