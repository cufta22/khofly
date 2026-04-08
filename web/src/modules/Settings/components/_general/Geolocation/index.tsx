import {
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import SettingsTitle from '../../common/SettingsTitle';
import classes from '../../../styles.module.scss';
import useForm from '@hooks/use-form';
import { useDisclosure } from '@mantine/hooks';
import useNominatimSWR from 'src/api/nominatim/use-nominatim-query';
import { useEffect, useState } from 'react';
import useToast from '@hooks/use-toast';
import { useGeneralStore } from '@store/general';
import { useTranslate } from '@hooks/translate/use-translate';
import { IconWorld } from '@tabler/icons-react';

const SettingsGeolocation = () => {
  const t = useTranslate();
  const theme = useMantineTheme();

  // Nomitanim stuff for geolocation
  const [openNominatim, { toggle: toggleNominatim, close: closeNominatim }] = useDisclosure(false);
  const { trigger, isMutating } = useNominatimSWR();
  const [nominatimVal, setNominatimVal] = useState('');

  const { toast } = useToast();

  const geolocation = useGeneralStore((state) => state.geolocation);
  const setGeolocation = useGeneralStore((state) => state.setGeolocation);

  const form = useForm({
    initialValues: {
      lat: '',
      lon: '',
    },
    validate: {
      lat: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : 'Invalid value'),
      lon: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : 'Invalid value'),
    },
  });

  const handleSubmitNominatim = async () => {
    const data = await trigger(nominatimVal);

    if (data.length === 0) {
      toast.show({ title: 'Nominatim error', message: 'Location not found', color: 'yellow' });
      return;
    }

    form.setFieldValue('lat', data[0].lat);
    form.setFieldValue('lon', data[0].lon);

    setGeolocation({ lat: data[0].lat, lon: data[0].lon });

    toast.show({ message: 'Location updated', color: 'green' });

    closeNominatim();
  };

  const handleSubmit = (values: typeof form.values) => {
    setGeolocation({ lat: values.lat, lon: values.lon });
    toast.show({ message: 'Location updated', color: 'green' });
  };

  useEffect(() => {
    if (!geolocation?.lat || !geolocation?.lon) return;

    form.setFieldValue('lat', geolocation.lat);
    form.setFieldValue('lon', geolocation.lon);
  }, [geolocation]);

  return (
    <>
      <Paper radius='md' withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SettingsTitle
            icon={<IconWorld color={theme.colors[theme.primaryColor][5]} />}
            title='pages.settings.geolocation.title'
          />

          {/* Settings content */}
          <Stack w='100%' align='start' px='lg' mb='xl'>
            <Flex align='flex-end' gap='md'>
              <TextInput
                label={t('pages.settings.geolocation.lat')}
                placeholder='00.0000000'
                {...form.getInputProps('lat')}
              />

              <TextInput
                label={t('pages.settings.geolocation.lon')}
                placeholder='00.0000000'
                {...form.getInputProps('lon')}
              />

              {!form.values.lat && !form.values.lon && (
                <Button onClick={toggleNominatim}>
                  {t('pages.settings.geolocation.use_nominatim')}
                </Button>
              )}
            </Flex>

            <Text size='sm' c='dimmed'>
              {t('pages.settings.geolocation.description1')}
            </Text>
          </Stack>

          <Flex
            align='center'
            justify='space-between'
            py='sm'
            px='lg'
            className={classes.settings_footer}
          >
            <Text size='sm' c='dimmed'>
              {t('pages.settings.geolocation.description2')}
            </Text>

            <Button type='submit'>{t('pages.settings._common.save')}</Button>
          </Flex>
        </form>
      </Paper>

      {/* Nomitanim modal */}
      <Modal
        title='Nominatim API'
        opened={openNominatim}
        withCloseButton
        onClose={toggleNominatim}
        size='lg'
        radius='md'
        centered
      >
        <Group align='flex-end'>
          <TextInput
            label={t('pages.settings.geolocation.your_location')}
            placeholder={t('pages.settings.geolocation.city_country')}
            className='flex_1'
            value={nominatimVal}
            onChange={(e) => setNominatimVal(e.currentTarget.value)}
          />
          <Button onClick={handleSubmitNominatim} loading={isMutating} disabled={isMutating}>
            {t('_common.search')}
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default SettingsGeolocation;
