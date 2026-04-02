import RemixLink from '@components/RemixLink';
import { useTranslate } from '@hooks/translate/use-translate';
import { usePrimaryColor } from '@hooks/use-primary-color';
import { Flex, Switch, Text } from '@mantine/core';
import { useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';
import React from 'react';

interface Props {
  isM?: boolean;
}

const AIAnswerSwitch: React.FC<Props> = ({ isM }) => {
  const t = useTranslate();

  const aiAnswer = useSettingsStore((state) => state.AIAnswer);
  const setAIAnswer = useSettingsStore((state) => state.setAIAnswer);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align='center' gap='sm'>
      {!isM && (
        <RemixLink to='/docs/ai-answers' target='_blank'>
          <Text component='span' c={linkTextColor}>
            {t('pages.settings.general.learn_more')}
          </Text>
        </RemixLink>
      )}

      <Switch
        checked={aiAnswer.enabled}
        onChange={(e) => setAIAnswer({ enabled: e.currentTarget.checked })}
        withThumbIndicator={isM ? false : true}
        size={isM ? 'md' : 'sm'}
      />
    </Flex>
  );
};

export default AIAnswerSwitch;
