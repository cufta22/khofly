import { Flex, Switch } from '@mantine/core';
import { useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
}

const AIChatSwitch: React.FC<Props> = ({ isM }) => {
  // const t = useTranslate();

  const AIChat = useSettingsStore((state) => state.AIChat);
  const setAIChat = useSettingsStore((state) => state.setAIChat);

  // const linkTextColor = usePrimaryColor(4);

  return (
    <Flex className={commonClasses.settings_control} align='center' gap='sm'>
      {/* <RemixLink to="/docs/ai-answers" target="_blank">
        <Text component="span" c={linkTextColor}>
          {t("pages.settings.general.learn_more")}
        </Text>
      </RemixLink> */}

      <Switch
        checked={AIChat.enabled}
        onChange={(e) => setAIChat({ enabled: e.currentTarget.checked })}
        withThumbIndicator={isM ? false : true}
        size={isM ? 'md' : 'sm'}
      />
    </Flex>
  );
};

export default AIChatSwitch;
