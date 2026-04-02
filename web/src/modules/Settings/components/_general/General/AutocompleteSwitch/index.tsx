import { useTranslate } from '@hooks/translate/use-translate';
import { Flex, MenuDivider, Select, Switch } from '@mantine/core';
import { type IAutocompleteEngines, useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
  mDisplay?: 'switch' | 'dropdown';
}

const AutocompleteSwitch: React.FC<Props> = ({ isM, mDisplay }) => {
  const t = useTranslate();

  const autocomplete = useSettingsStore((state) => state.autocomplete);
  const setAutocomplete = useSettingsStore((state) => state.setAutocomplete);

  const { enabled, engine } = autocomplete;

  if (isM && mDisplay === 'switch') {
  }

  return (
    <Flex className={commonClasses.settings_control} align='center' gap='sm'>
      {((!isM && enabled) || (isM && mDisplay === 'dropdown')) && (
        <Select
          disabled={isM && !enabled}
          allowDeselect={false}
          data={[
            {
              label: t('pages.settings.general.toggle_autocomplete_options.google'),
              value: 'google',
            },
            {
              label: t('pages.settings.general.toggle_autocomplete_options.DDG'),
              value: 'duckduckgo',
            },
            {
              label: t('pages.settings.general.toggle_autocomplete_options.brave'),
              value: 'brave',
            },
            {
              label: t('pages.settings.general.toggle_autocomplete_options.qwant'),
              value: 'qwant',
            },
          ]}
          value={engine}
          onChange={(val) => setAutocomplete({ engine: val as IAutocompleteEngines })}
          w={150}
        />
      )}

      {(!isM || (isM && mDisplay === 'switch')) && (
        <Switch
          checked={enabled}
          onChange={(e) => setAutocomplete({ enabled: e.currentTarget.checked })}
          withThumbIndicator={isM ? false : true}
          size={isM ? 'md' : 'sm'}
        />
      )}
    </Flex>
  );
};

export default AutocompleteSwitch;
