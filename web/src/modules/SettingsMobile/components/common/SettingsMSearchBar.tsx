import { Autocomplete, AutocompleteProps, Text } from '@mantine/core';
import type { IOpenSection } from '@module/SettingsMobile';
import { IconSearch } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import { SEARCH_OPTIONS } from './utils';
import { useState } from 'react';

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMSearchBar: React.FC<Props> = ({ handleChangeSection }) => {
  const [val, setVal] = useState('');

  const onOptionSubmit = (val: string) => {
    // General
    if (SEARCH_OPTIONS[0].items.includes(val)) handleChangeSection('general');
    // AI
    if (SEARCH_OPTIONS[1].items.includes(val)) handleChangeSection('ai');
  };

  return (
    <Autocomplete
      value={val}
      onChange={(val) => setVal(val)}
      placeholder='Search settings'
      radius='xl'
      leftSection={<IconSearch style={getIconStyle(20)} />}
      size='md'
      onOptionSubmit={onOptionSubmit}
      data={SEARCH_OPTIONS}
    />
  );
};

export default SettingsMSearchBar;
