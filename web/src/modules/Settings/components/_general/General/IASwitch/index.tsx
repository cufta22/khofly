import RemixLink from '@components/RemixLink';
import { useTranslate } from '@hooks/translate/use-translate';
import { usePrimaryColor } from '@hooks/use-primary-color';
import { Flex, Switch, Text } from '@mantine/core';
import { useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
}

const IASwitch: React.FC<Props> = ({ isM }) => {
  const t = useTranslate();

  const instantAnswers = useSettingsStore((state) => state.instantAnswers);
  const setInstantAnswers = useSettingsStore((state) => state.setInstantAnswers);

  const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align='center' gap='sm'>
      {!isM && (
        <RemixLink to='/docs/instant-answers' target='_blank'>
          <Text component='span' c={linkTextColor}>
            {t('pages.settings.general.learn_more')}
          </Text>
        </RemixLink>
      )}

      <Switch
        checked={instantAnswers.enabled}
        onChange={(e) => setInstantAnswers({ enabled: e.currentTarget.checked })}
        withThumbIndicator={isM ? false : true}
        size={isM ? 'md' : 'sm'}
      />
    </Flex>
  );
};

export default IASwitch;
