import { type IGeneralEngines, useEnginesStore } from '@store/engines';
import type { ICategories } from '@store/settings';
import { Table } from '@mantine/core';

import type { IDataEngine } from '@module/Settings/components/_engines/Engines/components/data';
import { CATEGORY_TO_STORE } from '@module/Settings/components/_engines/Engines/components/Wrapper/utils';
import EngineMComponent from '../EngineRow';

interface Props {
  category: ICategories;
  data: IDataEngine[];
  variant?: 'settings' | 'quick_settings';
}

const SettingsMEnginesWrapper: React.FC<Props> = ({ category, data, variant = 'settings' }) => {
  const engines = useEnginesStore((state) => state[CATEGORY_TO_STORE[category].data] as string[]);
  const setEngines = useEnginesStore(
    (state) => state[CATEGORY_TO_STORE[category].set] as (next: string[]) => void,
  );

  const handleChangeEngines = (e: IGeneralEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...engines, e];
    } else {
      newEngines = engines.filter((eng) => eng !== e);
    }

    setEngines(newEngines);
  };

  const rows = data.map((item, i) => (
    <EngineMComponent
      key={i}
      type={item.type}
      checked={!!engines.some((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) => handleChangeEngines(item.value as IGeneralEngines, next)}
      bang={item.bang}
      variant={variant || 'settings'}
      category={category}
    />
  ));

  return (
    <Table verticalSpacing='sm' px='md' w='100%'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Engine</Table.Th>

          <Table.Th ta='right'>Active</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default SettingsMEnginesWrapper;
