import useForm from '@hooks/use-form';
import { Button, Loader, rem, TextInput } from '@mantine/core';
import clsx from 'clsx';
import { IconWorld } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import type { TriggerWithArgs } from 'swr/mutation';
import type { IAPIResponse } from '@ts/global.types';
import type { PrivacyScanResponse } from 'src/api/privacyScan/types';

interface Props {
  isLoading: boolean;
  trigger: TriggerWithArgs<IAPIResponse<PrivacyScanResponse>, any, any, any>;
}

const SearchBox: React.FC<Props> = ({ isLoading, trigger }) => {
  const form = useForm({
    initialValues: {
      url: '',
    },
    validate: {
      url: (value) =>
        /^(?:(ftp|http|https):\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^ "]*)?$/.test(value)
          ? null
          : 'Invalid URL',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    trigger({ url: values.url });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        leftSectionWidth={48}
        rightSectionWidth={88}
        placeholder='example.com'
        radius='xl'
        size='lg'
        leftSection={
          isLoading ? (
            <Loader
              classNames={{
                root: clsx('desktop_only'),
              }}
              size={rem(24)}
            />
          ) : (
            <IconWorld style={getIconStyle(28)} stroke={1.5} />
          )
        }
        rightSection={
          <Button type='submit' radius='xl'>
            Scan
          </Button>
        }
        {...form.getInputProps('url')}
      />
    </form>
  );
};

export default SearchBox;
