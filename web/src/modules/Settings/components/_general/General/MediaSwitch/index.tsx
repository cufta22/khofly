import { useTranslate } from '@hooks/translate/use-translate';
import { Flex, Select, Switch } from '@mantine/core';
import { useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';
import React from 'react';

interface Props {
  isM?: boolean;
  mDisplay?: 'switch' | 'dropdown';
}

const MediaSwitch: React.FC<Props> = ({ isM, mDisplay }) => {
  const t = useTranslate();

  const generalMedia = useSettingsStore((state) => state.generalMedia);
  const setGeneralMedia = useSettingsStore((state) => state.setGeneralMedia);

  const { enabled, type } = generalMedia;

  return (
    <Flex className={commonClasses.settings_control} align='center' gap='sm'>
      {((!isM && enabled) || (isM && mDisplay === 'dropdown')) && (
        <Select
          disabled={isM && !enabled}
          allowDeselect={false}
          data={[
            {
              label: t('pages.settings.general.display_media_options.images'),
              value: 'images',
            },
            {
              label: t('pages.settings.general.display_media_options.videos'),
              value: 'videos',
            },
          ]}
          value={type}
          onChange={(val) => setGeneralMedia({ type: val as 'images' | 'videos' })}
          w={150}
        />
      )}

      {(!isM || (isM && mDisplay === 'switch')) && (
        <Switch
          checked={enabled}
          onChange={(e) => setGeneralMedia({ enabled: e.currentTarget.checked })}
          withThumbIndicator={!isM}
          size={isM ? 'md' : 'sm'}
        />
      )}
    </Flex>
  );
};

export default MediaSwitch;
