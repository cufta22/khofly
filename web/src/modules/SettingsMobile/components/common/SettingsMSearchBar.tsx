import { Autocomplete } from '@mantine/core';
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

  const onOptionSubmit = (next: string) => {
    // General
    if (SEARCH_OPTIONS[0].items.includes(next)) handleChangeSection('general');
    // AI
    if (SEARCH_OPTIONS[1].items.includes(next)) handleChangeSection('ai');
  };

  return (
    <Autocomplete
      value={val}
      onChange={(next) => setVal(next)}
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
